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
import MuiAlert from '@material-ui/lab/Alert';
import { forgetPass, generateCode, getProfile } from "../../Redux/Users/UsersActions";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../Redux/Offers/OffersActions";
import BaseButton from "../Base/BaseButton";

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
function ForgetPass()
{
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user_store = useSelector(state => state.User)
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    email: "test@gmail.com",
    newPassword: "12345678",
    otpCode: "12345",
});
  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          dispatch(getProfile());
          dispatch(getOffers());
          history.push("/Offers");
        } catch (error) {
          console.log("high error1",error);
        }
      }
    })();
  }, [history, dispatch]);
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
    dispatch(generateCode({ email:FormState.email }))
  };
  const handleForget = async (e) => {
    setSnackbarState({...SnackbarState,open:true})
    dispatch(forgetPass(FormState))
  };
  return (
  <div>
    <Snackbar open={SnackbarState.open&&(user_store.loading||user_store.error)} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
      <Alert onClose={SnackbarClose} severity={user_store.error?"error":"info"}>
        {user_store.error?user_store.error:"Wait please"}
      </Alert>
    </Snackbar>
  {user_store.user.firstName?<div></div>:
  <div className={classes.signin}>
      <br />
    {user_store.user.email?
    <div>
      <h2 style={{color:'#000'}}>Enter your Code and New Password</h2>
      <ValidatorForm 
        component="fieldset" 
        dir="rtl" onSubmit={(e) => handleForget(e)} 
        enctype="multipart/form-data">
        <TextValidator 
          required validators={['required', 'matchRegexp:^[0-9]{1,30}$']} 
          errorMessages={['this field is required', 'Enter Number']} 
          name="otpCode" id="otpCode" 
          value = {FormState.otpCode} 
          onChange={(e) => handleChange(e)} 
          label="Code" />
          <br />
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={FormState.newPassword}
          name="newPassword"
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
        <BaseButton type="submit" content="Submit"/>
      </ValidatorForm>

    </div>:
    <div  className="form-container" >
      <h2 style={{color:'#000'}}>Enter your email</h2>
      <ValidatorForm 
        component="fieldset" 
        dir="rtl" onSubmit={(e) => handleSubmit(e)} 
        enctype="multipart/form-data">
        <TextValidator 
          required validators={['required', 'isEmail']} 
          errorMessages={['this field is required', 'Email is not valid']} 
          name="email" id="email" 
          value = {FormState.email} 
          onChange={(e) => handleChange(e)} 
          label="Enter Email" />
                      
        <br />
        <BaseButton
          type="submit"
          content="Submit"/>
      </ValidatorForm>
      <div>
        <br /><br />
        Don't have account?
        &nbsp;
        <Link className={classes.link} to='/signup'>Sign Up</Link>
      </div>  
    </div>}
     
  </div>
    }
  </div>
  );
}
export default ForgetPass;