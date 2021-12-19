import getErrorMessage from "../../Errors";
import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS, 
    FETCH_PROFILE_FAILURE,
    FETCH_RESET_PASS_SUCCESS,
    FETCH_GENERATE_CODE_SUCCESS,
    FETCH_EDIT_EMAIL_SUCCESS
} from "./usersActionTypes"; 
import messaging from '../../FirebaseConf'
  
const clientAuth =require ('../../API/clientAuth');
  

export const signup = body => async (dispatch, getState) =>{
    dispatch({ type:FETCH_PROFILE_REQUEST  })
}

export const signupUserRequestAction = () => {
    return {
      type: FETCH_PROFILE_REQUEST,
    };
};

export const signupUserSuccessAction = (user) => {
    return {
        type: FETCH_PROFILE_SUCCESS,
        payload: user,
    };
};

export const editUserSuccessAction = (user) => {
    return {
        type: FETCH_EDIT_EMAIL_SUCCESS,
        payload: user,
    };
};
export const signupUserFailureAction = (error) => {
return {
    type: FETCH_PROFILE_FAILURE,
    payload: error,
};
};

export const signupUser = (body) => {
return (dispatch) => {
    dispatch(signupUserRequestAction());

    const promise = clientAuth.register(body);

    promise.then((response) => {
        const user = response.result.user ;

        console.log("userToShow : \n", user);


        dispatch(signupUserSuccessAction(user));
    })
    promise.catch((error) => {
        if(error.response){
            const errorMsg = getErrorMessage(error.response.data.error.code);
            dispatch(verifyCodeUserFailureAction(errorMsg));}
    });
};
};



export const getProfileRequestAction = () => {
    return {
      type: FETCH_PROFILE_REQUEST,
    };
};

export const getProfileUserSuccessAction = (user) => {
return {
    type: FETCH_PROFILE_SUCCESS,
    payload: user,
};
};

export const getProfileUserFailureAction = (error) => {
return {
    type: FETCH_PROFILE_FAILURE,
    payload: error,
};
};

export const getProfile = () => {
return (dispatch) => {
    dispatch(getProfileRequestAction());
    const promise = clientAuth.getProfile();
    promise.then((response) => {
        let user = response.result.user ;
        user = {...user,role:"guest"};

        console.log("userToShow : \n", user);


        dispatch(getProfileUserSuccessAction(user));
    })
    promise.catch((error) => { if(error.response){
        const errorMsg = getErrorMessage(error.response.data.error.code);
        dispatch(verifyCodeUserFailureAction(errorMsg));}
    });
};
};



export const verifyCodeRequestAction = () => {
    return {
      type: FETCH_PROFILE_REQUEST,
    };
};

export const verifyCodeUserSuccessAction = (user) => {
    return {
        type: FETCH_PROFILE_SUCCESS,
        payload: user,
};
};

export const resetPasswordSuccessAction = () => {
    return {
        type: FETCH_RESET_PASS_SUCCESS,
        payload: "",
    };
};
export const generateCodeSuccessAction = (body) => {
    return {
        type: FETCH_GENERATE_CODE_SUCCESS,
        payload: body,
    };
};
    
export const verifyCodeUserFailureAction = (error) => {
return {
    type: FETCH_PROFILE_FAILURE,
    payload: error,
};
};

export const verifyCode = (body) => {
return (dispatch) => {
    dispatch(verifyCodeRequestAction());
    const promise = clientAuth.checkVerifyCode(body);
    promise.then(async(response) => {
        let user = response.result.user ;
        user = {...user,role:"guest"};
        let accessToken = response.result.accessToken;
        localStorage.setItem("accessToken", accessToken);
        console.log("userToShow : \n", user);
        dispatch(verifyCodeUserSuccessAction(user));
        const token = await messaging.getToken({ vapidKey: 'BOt_W4d2Y8ZY5jaET0-QfBR_cYbNHM6bWFEJ57a8DD9zylsGlRP9KNDYHCX9VHjTTVAkg53pHsHtnV34wl5vZmo' })
        console.log("ffff",token)
        clientAuth.refreshFirebaseToken(token);
    })
    promise.catch((error) => {
        if(error.response){
            const errorMsg = getErrorMessage(error.response.data.error.code);
            dispatch(verifyCodeUserFailureAction(errorMsg));}
    });
};
};


export const login = (body) => {
    return (dispatch) => {
        dispatch(verifyCodeRequestAction());
        const promise = clientAuth.login(body);
        promise.then(async(response) => {
            let user = response.result.user ;
            user = {...user,role:"guest"};
            let accessToken = response.result.accessToken;
            localStorage.setItem("accessToken", accessToken);
            console.log("userToShow : \n", user);
            dispatch(verifyCodeUserSuccessAction(user));
            const token = await messaging.getToken({ vapidKey: 'BOt_W4d2Y8ZY5jaET0-QfBR_cYbNHM6bWFEJ57a8DD9zylsGlRP9KNDYHCX9VHjTTVAkg53pHsHtnV34wl5vZmo' })
            clientAuth.refreshFirebaseToken(token);
        })
        promise.catch((error) => {
            if(error.response){
            const errorMsg = getErrorMessage(error.response.data.error.code);
            dispatch(verifyCodeUserFailureAction(errorMsg));}
        });
    };
};
export const editEmail = (body) => {
    return (dispatch) => {
        dispatch(verifyCodeRequestAction());
        const promise = clientAuth.editEmail(body);
        promise.then((response) => {
            dispatch(editUserSuccessAction(body.newEmail));
        })
        promise.catch((error) => {
            if(error.response){
                const errorMsg = getErrorMessage(error.response.data.error.code);
                dispatch(verifyCodeUserFailureAction(errorMsg));}
        });
    };
};


export const logout = () => {
    return (dispatch) => {
        dispatch(verifyCodeRequestAction());
        const promise = clientAuth.logout();
        promise.then((response) => {
            localStorage.removeItem("accessToken");
            dispatch(verifyCodeUserSuccessAction({}));
            
        })
        promise.catch((error) => {
    
            if(error.response){
                const errorMsg = getErrorMessage(error.response.data.error.code);
                dispatch(verifyCodeUserFailureAction(errorMsg));}
        });
    };
};

export const resetPass = (body) => {
    return (dispatch) => {
        dispatch(verifyCodeRequestAction());
        const promise = clientAuth.resetPass(body);
        promise.then((response) => {
            dispatch(resetPasswordSuccessAction());
        })
        promise.catch((error) => {
            if(error.response){
                const errorMsg = getErrorMessage(error.response.data.error.code);
                dispatch(verifyCodeUserFailureAction(errorMsg));}
        });
    };
};


export const generateCode = (body) => {
    return (dispatch) => {
        dispatch(verifyCodeRequestAction());
        const promise = clientAuth.generate_code(body);
        promise.then(() => {
            dispatch(generateCodeSuccessAction(body));
        })
        promise.catch((error) => { if(error.response){
            const errorMsg = getErrorMessage(error.response.data.error.code);
            dispatch(verifyCodeUserFailureAction(errorMsg));}
        });
    };
};

export const forgetPass = (body) => {
    return (dispatch) => {
        dispatch(verifyCodeRequestAction());
        const promise = clientAuth.forgetPass(body);
        promise.then(() => {
            dispatch(generateCodeSuccessAction(body));
            dispatch(login({email:body.email,password:body.newPassword}));
        })
        promise.catch((error) => { 
            if(error.response){
            const errorMsg = getErrorMessage(error.response.data.error.code);
            dispatch(verifyCodeUserFailureAction(errorMsg));}
        });
    };
};