import React, { useState, useEffect } from "react";
//import { getPayloadLogin, getPayloadSignup } from '../../actions/LoginActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { editEmail, getProfile, resetPass } from "../../Redux/Users/UsersActions";
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "../Base/BaseButton";
import EmailTextValidator from '../Base/EmailTextValidator';
import NumberTextValidator from '../Base/NumberTextValidator';
const clientAuth =require ('../../API/clientAuth');
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
function ResetEmail()
{
  const classes = useStyles();
  const dispatch = useDispatch();
  const user_store = useSelector(state => state.User)
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [verify, setVerify] = useState(false);
  const [password, setPassword] = useState();
  const [code, setCode] = useState();
  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          getProfile()
     //     dispatch(getOffers);
        } catch (error) {
          console.log("high error1",error);
        }
      }
    })();
  }, []);
  const SnackbarClose = () => {
    setSnackbarState({...SnackbarState,open:false})
  }
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    const promise = clientAuth.generateCodeEmail({oldPassword:password, newEmail:email})
    promise.then((res)=>{
      setVerify(true)
    }).catch((error)=>{
        console.log("error");
    })
  };
  const handleEdit = async (e) => {
    dispatch(editEmail({oldPassword: password,newEmail: email,otpCode: code}))
  }
  return (
  <div>
    <Snackbar open={SnackbarState.open&&(user_store.loading||user_store.error)} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
      <Alert onClose={SnackbarClose} severity={user_store.error?"error":"info"}>
        {user_store.error?user_store.error:"Wait please"}
      </Alert>
    </Snackbar>
  {user_store.user.firstName&&!verify?
    <div  className={classes.signin} >
            <br></br>
            <h2 style={{color:'#000'}}>تغيير الأيميل</h2>
            <ValidatorForm 
              component="fieldset" 
              dir="rtl" onSubmit={(e) => handleSubmit(e)} 
              enctype="multipart/form-data">
            <EmailTextValidator 
                required={true}
                name="email"
                value={email}
                label="الأيميل"
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <br />
            <br />
            <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              name="oldPassword"
              onChange={(e) => {setPassword(e.target.value)}}
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
              type="submit" content="تغيير الأيميل"/>
          </ValidatorForm>    
        </div>
    :user_store.user.firstName&&verify?
          <div className={classes.signin} >
            <br></br>
            <h2 style={{color:'#000'}}>التحقق من الأيميل</h2>
            <ValidatorForm 
              component="fieldset2" 
              dir="rtl" onSubmit={(e) => handleSubmit(e)} >
            <NumberTextValidator 
                required={true}
                name="code"
                value={code}
                label="الكود"
                onChange={(e)=>{setCode(e.target.value)}}
            />
                        
            <br />
            <br />
            <BaseButton 
              type="submit" content="ادخال"/>
          </ValidatorForm>    
        </div>
    
    :<div></div>
    }
  </div>
  );
}



export default ResetEmail;