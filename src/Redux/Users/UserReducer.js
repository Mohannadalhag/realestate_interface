import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_RESET_PASS_SUCCESS,
  FETCH_GENERATE_CODE_SUCCESS,
  FETCH_EDIT_EMAIL_SUCCESS
  } from "./usersActionTypes";
const initState = {
  loading: false, 
  user: {},
  error: "",
};
const UserReducer = (state = initState, action) => {
    switch(action.type){
      case FETCH_PROFILE_REQUEST: {
      return {
          ...state,
          loading: true,
        };
      }
      case FETCH_PROFILE_SUCCESS: {
      return {
          loading: false,
          user: action.payload,
          error: "",
        };
      }
      case FETCH_EDIT_EMAIL_SUCCESS: {
      return {
          loading: false,
          user: {...state.user,email:action.payload},
          error: "",
        };
      }
      case FETCH_PROFILE_FAILURE: {
      return {
          ...state,
          error: action.payload,
          loading:false
        };
      }
      case FETCH_RESET_PASS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: "",
        };
      }
      case FETCH_GENERATE_CODE_SUCCESS: {
        return {
          user: action.payload,
          loading: false,
          error: "",
        };
      }
      default: {
        return state;
      }
    }
}
export default UserReducer;
