import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { getProfile, verifyCode } from "../../Redux/Users/UsersActions";
import BaseButton from "../Base/BaseButton";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  signIn: {
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


function VerifyCode({user_store, verifyCode, getProfile})
{
    let history = useHistory();
    const classes = useStyles();
    const [code, setCode] = useState("12345");
    useEffect(() => {
      (async () => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          getProfile()
          history.push("/Offers");
        }
      })();
    }, [history,getProfile]);
  
    const handleChange = (e) => {
      setCode(e.target.value);
    };
  
   
  

    const handleSubmit = async (e) => {
      verifyCode({email:user_store.user.email, otpCode:code})
      history.push("Offers")
    };
  return (
  <div className={classes.signIn}>
      <div>
        <div className="App">
          <div  className={`form-container`} >
            <br></br>
            <h2 style={{color:'#000'}}>Verify Code</h2>
            <ValidatorForm
              component="fieldset" 
              dir="rtl" onSubmit={(e) => handleSubmit(e)} 
              enctype="multipart/form-data">   
              <TextValidator 
                required validators={['required']}
                errorMessages={['this field is required']}
                name="code" id="code"
                value = {code}
                onChange={(e) => handleChange(e)}
                label="Code" />
                <br />
              
                <BaseButton 
                  type="submit"
                  onClick={(e) => handleSubmit(e)} 
                  content="Verify"/>
              </ValidatorForm>
        
              <div>
                <br /><br />
                
                Already have verified account?
                <Link className={classes.link} 
                  to='/'>Log In</Link>
              </div>
            </div>
      </div>
      </div>
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
    verifyCode : (body) =>{
      dispatch(verifyCode(body))
    },
    getProfile: (body) =>{
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(VerifyCode) ;

