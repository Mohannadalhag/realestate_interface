//import LoginReducer from './LoginReducer';
import OffersReducer from '../Redux/Offers/OffersReducer';
import UserReducer from '../Redux/Users/UserReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    Offers : OffersReducer,
  //  Login : LoginReducer,
    User : UserReducer,
    debug : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
});
export default allReducers;