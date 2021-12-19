import React, { useState, useEffect } from "react";
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getProfile, signupUser} from "../../Redux/Users/UsersActions";
import BaseButton from "../Base/BaseButton";
import { connect } from "react-redux";
import {
  FormLabel,
  Select,
  MenuItem
} from "@material-ui/core";
const clientOffer =require ('../../API/clientOffer');

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  signin: {
    background: 'rgba(44,62,80,0.3)',
    borderRadius:'20px',
    padding: '40px',
    width: '250px',
    margin: 'auto',
    marginTop: '90px',
    marginLeft: '180x',
    textAlign:'center'
    
  },
  link: {
    margin:'5px',
    font:'13px',
    fontFamily:'Tahoma Geneva, sans-serif',
    color: 'blue',
    textDecoration: 'blink'
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Signup({user_store,signupUser,getProfile})
{
    let history = useHistory();
    const classes = useStyles();
    const [provinces, setProvinces] = useState([]);
    const [regions, setRegions] = useState([]);
    const [showPassword, setShowPassword] = React.useState(false);
    // const user = useSelector(state => state.User);
    const [FormState, setFormState] = useState({
      email: "mohannad@gmail.com",
      firstName:"Mohannad",
      lastName:"Mohannad",
      password: "12345678",
      ConfirmPassword:"12345678",
    });
    const [SnackbarState, setSnackbarState] = useState({
      open: true,
      vertical: 'top',
      horizontal: 'center',
      severity: "error",
      message: "",
    });

    useEffect(() => {
      (async () => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          getProfile()
     //     dispatch(getOffers);
       //   history.push("/Offers");
        }
        const promiseProvince = clientOffer.getProvince();
        promiseProvince.then(res=>{
          setProvinces(res.result.provinces)
        })
      })();
    }, [history,getProfile]);

    const SnackbarClose = () => {
      setSnackbarState({...SnackbarState,open:false})
    }
    const handleChangeProvince = (e) => {
      const promiseRegion = clientOffer.getRegions(e.target.value);
        promiseRegion.then(res=>{
        setRegions(res.result.regions)
      })
    }
    
    const handleChange = (e) => {
      setFormState({ ...FormState, [e.target.name]: e.target.value });
    };
  
   
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = async (e) => {
      setSnackbarState({...SnackbarState,open:true})
      //const { email, password, firstName, lastName } = FormState;
      signupUser(FormState)
      
  };
  
  return (
  <div>

  <Snackbar open={SnackbarState.open&&(user_store.loading||user_store.error)} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
    <Alert onClose={SnackbarClose} severity={user_store.error?"error":"info"}>
      {user_store.error?user_store.error:"Wait please"}
    </Alert>
  </Snackbar>
  {console.log("hhhhh",user_store)}
  {user_store.user.firstName?<div>{history.push("verify_code")}</div>:
  <div  className={classes.signin}>
    <h2 style={{color:'#000'}}>انشاء حساب</h2>
    <ValidatorForm 
      component="fieldset" 
      dir="rtl" onSubmit={(e) => handleSubmit(e)} 
      enctype="multipart/form-data">   
    <TextValidator 
      required validators={['required']}
      errorMessages={['this field is required']}
      name="firstName" id="firstName"
      value = {FormState.firstName}
      onChange={(e) => handleChange(e)}
      label="الاسم الأول" />
      <br />
    <TextValidator
      required validators={['required']}
      errorMessages={['this field is required']}
      name="lastName" id="lastName"
      value = {FormState.lastName}
      onChange={(e) => handleChange(e)}
      label="الاسم الأخير" />
      <br />
    <TextValidator
      required validators={['required', 'isEmail']}
      errorMessages={['this field is required', 'email is not valid']} 
      name="email" id="email" 
      value = {FormState.email} 
      onChange={(e) => handleChange(e)} 
      label="الأيميل" />
      <br />
      <FormLabel htmlFor="offerType">المحافظة</FormLabel>
              <br />
              <br />
              <Select 
                required
                onChange={handleChangeProvince}>
              {provinces.length===0?<React.Fragment />:
                provinces.map(province =>(
                  <MenuItem value={province._id}>{province.provinceArabicName}</MenuItem>
                ))
              }
              </Select>

              <br />
              <br />
              
              <FormLabel htmlFor="offerType">المنطقة</FormLabel>
              <br />
              <br />
              <Select
                  name="region"
                  required
                  value={FormState.region} 
                  onChange={e => handleChange(e)}>
              {regions.length===0?<React.Fragment />:
                regions.map(region =>(
                  <MenuItem value={region._id}>{region.regionArabicName}</MenuItem>
                ))
              }
              </Select>
<br />
    <InputLabel htmlFor="standard-adornment-password">كلمة المرور</InputLabel>
    <Input
      id="standard-adornment-password"
      type={showPassword ? 'text' : 'password'}
      value={FormState.password}
      name="password"
      onChange={(e) => handleChange(e)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }/>
      <br />
      <br />

  <InputLabel htmlFor="standard-adornment-password">تأكيد كلمة المرور</InputLabel>
    <Input
      id="confirm_password"
      type={showPassword ? 'text' : 'password'}
      value={FormState.ConfirmPassword}
      name="ConfirmPassword"
      onChange={(e) => handleChange(e)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }/>
      <br />
      <br />
  
    <BaseButton 
      type="submit" content="انشاء حساب"/>
  </ValidatorForm>
      <br />
    <div>
      
    هل تملك حساب؟
    <Link className={classes.link} to='/'>تسجيل الدخول</Link>
    </div>
  </div>
  }
  </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user_store: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser : (body) =>{
      dispatch(signupUser(body))
    },
    getProfile: (body) =>{
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup) ;
