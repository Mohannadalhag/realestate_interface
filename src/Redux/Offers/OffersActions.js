import getErrorMessage from "../../Errors";
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
  
const clientOffer =require ('../../API/clientOffer');

export const getOffersRequestAction = () => {
    return {
      type: FETCH_OFFERS_REQUEST,
    };
};

export const myOffersSuccessAction = (result) => {
return {
    type: FETCH_MY_OFFERS_SUCCESS,
    payload: result,
};
};

export const recommendedOffersSuccessAction = (result) => {
    return {
        type: FETCH_RECOMMENDED_OFFERS_SUCCESS,
        payload: result,
    };
};

export const savedOffersSuccessAction = (result) => {
    return {
        type: FETCH_SAVED_OFFERS_SUCCESS,
        payload: result,
    };
};

export const getOffersSuccessAction = (result) => {
    return {
        type: FETCH_OFFERS_SUCCESS,
        payload: result,
    };
};
export const deleteOffersSuccessAction = (result) => {
    return {
        type: FETCH_DELETE_OFFERS_SUCCESS,
        payload: result,
    };
};
export const addOffersSuccessAction = (result) => {
    return {
        type: FETCH_ADD_OFFERS_SUCCESS,
        payload: result,
    };
};
export const editOffersSuccessAction = (result) => {
    return {
        type: FETCH_EDIT_OFFERS_SUCCESS,
        payload: result,
    };
};
export const likeOffersSuccessAction = (result) => {
    return {
        type: FETCH_LIKE_OFFERS_SUCCESS,
        payload: result,
    };
};

export const refreshSavedOffersSuccessAction = (result) => {
    return {
        type: REFRESH_SAVE_OFFERS_SUCCESS,
        payload: result,
    };
};

export const saveOffersSuccessAction = (result) => {
    return {
        type: FETCH_SAVE_OFFERS_SUCCESS,
        payload: result,
    };
};
export const getOffersFailureAction = (error) => {
return {
    type: FETCH_OFFERS_FAILURE,
    payload: error,
};
};

export const getOffers = (page) => {
return (dispatch) => {
    dispatch(getOffersRequestAction());

    const promise = clientOffer.getPage(page);

    promise.then((response) => {
        const result = response.result ;
        dispatch(getOffersSuccessAction(result));
    })
    promise.catch((err) => {
        //console.log("gggg",err.contains("Network Error"));

        //const errorMsg = getErrorMessage(err.response.data.error.code);

        dispatch(getOffersFailureAction("errorMsg"));
    });
};
};

export const savedOffers = () => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());
    
        const promise = clientOffer.getSavedOffers();
    
        promise.then((response) => {
            const result = response.result ;
            dispatch(savedOffersSuccessAction(result));
        })
        promise.catch((error) => {if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

            dispatch(getOffersFailureAction(errorMsg));}
    
        });
    };
};

export const myOffers = (page) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());
    
        const promise = clientOffer.getMyOffersPage(page);
    
        promise.then((response) => {
            const result = response.result ;
            dispatch(myOffersSuccessAction(result));
        })
        promise.catch((error) => {
            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};
export const recommendedOffers = (page) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());
    
        const promise = clientOffer.getRecommendedOffersPage(page);
    
        promise.then((response) => {
            const result = response.result ;
            dispatch(recommendedOffersSuccessAction(result));
        })
        promise.catch((error) => {
            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};
export const searchOffers = (body) => {
return (dispatch) => {
    dispatch(getOffersRequestAction());

    const promise = clientOffer.getSearchPage(body);

    promise.then((response) => {
        const result = response.result ;
        dispatch(getOffersSuccessAction(result));
    })
    promise.catch((error) => {
if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

        dispatch(getOffersFailureAction(errorMsg));}
    });
};
};
export const deleteOffer = (body) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());

        const promise = clientOffer.delete(body);
        promise.then(
            res => {
                dispatch(deleteOffersSuccessAction(body))
            }
        );

        promise.catch((error) => {

            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};
export const addOffer = (body) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());

        const promise = clientOffer.post(body);
        promise.then(
            res => {
                dispatch(addOffersSuccessAction(res.result.offer))
            }
        );

        promise.catch((error) => {
            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};

export const editOffer = (body) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());

        const promise = clientOffer.put(body.body,body.id);
        promise.then(
            res => {
                dispatch(editOffersSuccessAction(res.result.offer))
            }
        );

        promise.catch((error) => {
            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};
export const likeOffer = (id) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());

        const promise = clientOffer.like(id);
        promise.then(
            res => {
                dispatch(likeOffersSuccessAction({...res.result,id:id}))
            }
        );


        promise.catch((error) => {
            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};

export const saveOffer = (id, SavedOffers) => {
    return (dispatch) => {
        dispatch(getOffersRequestAction());

        const promise = clientOffer.save(id);
        promise.then(
            res => {
                dispatch(saveOffersSuccessAction({...res.result,id:id}))
                if(SavedOffers)dispatch(refreshSavedOffersSuccessAction({}))
            }
        );


        promise.catch((error) => {
            if(error.response)     {  const errorMsg = getErrorMessage(error.response.data.error.code);

                dispatch(getOffersFailureAction(errorMsg));}
        
        });
    };
};