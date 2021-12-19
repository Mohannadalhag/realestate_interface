import {
  FETCH_OFFERS_REQUEST,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  FETCH_DELETE_OFFERS_SUCCESS,
  FETCH_ADD_OFFERS_SUCCESS,
  FETCH_EDIT_OFFERS_SUCCESS,
  FETCH_LIKE_OFFERS_SUCCESS,
  FETCH_SAVE_OFFERS_SUCCESS,
  FETCH_MY_OFFERS_SUCCESS,
  FETCH_SAVED_OFFERS_SUCCESS,
  REFRESH_SAVE_OFFERS_SUCCESS,
  FETCH_RECOMMENDED_OFFERS_SUCCESS
  } from "./OffersActionTypes";
const initState = {
  loading: false, 
  offers: [],
  error: "",
  pageCount:1
};
const OffersReducer = (state = initState, action) => {
    switch(action.type){
      case FETCH_OFFERS_REQUEST: {
      return {
          ...state,
          loading: true,
        };
      }
      case FETCH_OFFERS_SUCCESS: {
      return {
          loading: false,
          offers: action.payload.offers,
          pageCount: action.payload.pageCount,
          error: "",
        };
      }
      case FETCH_MY_OFFERS_SUCCESS: {
      return {
          loading: false,
          offers: action.payload.offers,
          pageCount: action.payload.pageCount,
          error: "",
        };
      }
      case FETCH_RECOMMENDED_OFFERS_SUCCESS: {
      return {
          loading: false,
          offers: action.payload.offers,
          pageCount: action.payload.pageCount,
          error: "",
        };
      }
      case REFRESH_SAVE_OFFERS_SUCCESS: {
      return {
          loading: false,
          offers: state.offers.filter(offer=>offer.isSaved),
          pageCount: action.payload.pageCount,
          error: "",
        };
      }
      case FETCH_SAVED_OFFERS_SUCCESS: {
      return {
          loading: false,
          offers: action.payload.offers,
          pageCount: action.payload.pageCount,
          error: "",
        };
      }
      case FETCH_OFFERS_FAILURE: {
      return {
          ...state,
          error: action.payload,
          loading:false
        };
      }
      case FETCH_DELETE_OFFERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          offers: state.offers.filter(item => item._id !== action.payload),
          error: "",
        };
      }
      case FETCH_ADD_OFFERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          offers: state.offers.concat(action.payload),
          error: "",
        };
      }
      case FETCH_EDIT_OFFERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          offers: state.offers.map(item => item._id === action.payload._id ? action.payload: item),
          error: "edited",
        };
      }

      case FETCH_LIKE_OFFERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          offers: state.offers.map(item => 
            item._id === action.payload.id ? 
            {...item,numberOfLikes:action.payload.numberOfLikes,isLiked:action.payload.isLiked}
              : item),
          error: "",
        };
      }
      case FETCH_SAVE_OFFERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          offers: state.offers.map(item => 
            item._id === action.payload.id ? 
            {...item,isSaved:action.payload.isSaved}
              : item),
          error: "",
        };
      }
      default: {
        return state;
      }
    }
}
export default OffersReducer;
