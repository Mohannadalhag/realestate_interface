import React, { useState, useEffect } from "react";
//import { getPayloadLogin, getPayloadSignup } from '../../actions/LoginActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import { getProfile, login } from "../../Redux/Users/UsersActions";
import BaseButton from "../Base/BaseButton"
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
    textDecoration: 'inherit'
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Login({user_store,login,getProfile})
{
  let history = useHistory();
  const classes = useStyles();
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          getProfile()
     //     dispatch(getOffers);
          history.push("/Offers");
        } catch (error) {
          console.log("high error1",error);
        }
      }
    })();
  }, [history,getProfile]);
  const SnackbarClose = () => {
    setSnackbarState({...SnackbarState,open:false})
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
    const { email, password } = FormState;
    login({ email, password })
  };
  return (
  <div>
    <Snackbar open={SnackbarState.open&&(user_store.loading||user_store.error)} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
      <Alert onClose={SnackbarClose} severity={user_store.error?"error":"info"}>
        {user_store.error?user_store.error:"Wait please"}
      </Alert>
    </Snackbar>
  {user_store.user.role?<div>{history.push("Offers")}</div>:
      <div className={classes.signin}>
          <div>
            <div className="App">
              <div  className="form-container" >
                <br></br>
                <h2 style={{color:'#000'}}>تسجيل الدخول</h2>
                <ValidatorForm 
                  component="fieldset" 
                  dir="rtl" onSubmit={(e) => handleSubmit(e)} 
                  encType="multipart/form-data">
                <TextValidator 
                fullWidth
                required validators={['required', 'isEmail']} 
                  errorMessages={['this field is required', 'Email is not valid']} 
                  name="email" id="email" 
                  value = {FormState.email} 
                  onChange={(e) => handleChange(e)} 
                  label="الأيميل" />
                              
                <br />
                <br />
              
                <InputLabel htmlFor="standard-adornment-password">كلمة المرور</InputLabel>
                <Input
                fullWidth
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={FormState.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle Password visibility"
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
                  type="submit" content="تسجيل الدخول"/>
              </ValidatorForm>
        
              <div>
                <br /><br />
                <Link className={classes.link} to='/'>الدخول كزائر</Link>
                <br /><br />
                <Link className={classes.link} to='/forget_pass'>هل نسيت كلمة السر</Link>
                <br /><br />
                هل تملك حساب
                &nbsp;
                <Link className={classes.link} to='/signup'>انشاء حساب</Link>
              </div>




        
            </div>
          </div>
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
    login : (body) =>{
      dispatch(login(body))
    },
    getProfile: (body) =>{
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);