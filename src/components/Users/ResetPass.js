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
import { getProfile, resetPass } from "../../Redux/Users/UsersActions";
import { useDispatch, useSelector } from "react-redux";
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
function ResetPass()
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
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    oldPassword: "12345678",
    newPassword: "123456789",
  });
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
    const { oldPassword, newPassword } = FormState;
    dispatch(resetPass({ oldPassword, newPassword }));
  };
  return (
  <div>
    <Snackbar open={SnackbarState.open&&(user_store.loading||user_store.error)} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
      <Alert onClose={SnackbarClose} severity={user_store.error?"error":"info"}>
        {user_store.error?user_store.error:"Wait please"}
      </Alert>
    </Snackbar>
  {user_store.user.firstName?
      <div className={classes.signin}>
          <div>
            <div className="App">
            </div>
            <div className="App">
              <div  className="form-container" >
                <br></br>
                <h2 style={{color:'#000'}}>Change Password</h2>
                <ValidatorForm 
                  component="fieldset" 
                  dir="rtl" onSubmit={(e) => handleSubmit(e)} 
                  enctype="multipart/form-data">
                <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={FormState.oldPassword}
                  name="oldPassword"
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
              
                <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
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
                <br />
                <BaseButton 
                  type="submit" content="Reset Password"/>
              </ValidatorForm>    
            </div>
          </div>
          </div>
     
      </div>
      :<div></div>
    }
  </div>
  );
}



export default ResetPass;