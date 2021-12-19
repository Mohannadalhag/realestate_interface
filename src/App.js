import React, { useEffect } from "react";
import { useDispatch} from 'react-redux';
import Offers from './components/Offers/Offers';
import { Route } from "react-router-dom";
import AddOffer from './components/Offers/AddOffer';
import EditOffer from './components/Offers/EditOffer';
import OfferDetails from './components/Offers/OfferDetails';
import  NavMenu  from './components/NavMenu';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import VerifyCode from "./components/Users/VerifyCode";
import Profile from "./components/Users/Profile";
import ResetPass from "./components/Users/ResetPass";
import ForgetPass from "./components/Users/ForgetPass";
import { getProfile } from "./Redux/Users/UsersActions";
import SearchOffer from "./components/Offers/SearchOffer";
import SavedOffers from "./components/Offers/SavedOffers";
import MyOffers from "./components/Offers/MyOffers";
import ResetEmail from "./components/Users/ResetEmail";
import RecommendedOffers from './components/Offers/RecommendedOffers'
import messaging from "./FirebaseConf";

messaging.onMessage(payload=>{
  console.log("Notification\n",payload)
})

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
       dispatch(getProfile());
      }
    })();
  }, [dispatch]);
  return (
    <div className="App">  
      <Router> 
        <NavMenu></NavMenu>
            {/* <Route path="/Offers"><div><Login /><Offers /></div></Route> */}
            <Route exact={true} path="/Offers" component={Offers}/>
            <Route path="/login"><Login /></Route>
            <Route exact path="/signup"><Signup /></Route>
            <Route exact path="/profile"><Profile /></Route>
            <Route exact path="/verify_code"><VerifyCode /></Route>
            <Route exact path="/" component={Offers}></Route>
            <Route exact path="/forget_pass"><ForgetPass /></Route>
            <Route exact path="/reset_pass"><ResetPass /></Route>
            <Route exact path="/reset_email"><ResetEmail /></Route>
            <Route path="/addOffer"><AddOffer /></Route>
            <Route path="/searchOffer"><SearchOffer /></Route>
            <Route path="/SavedOffers"><SavedOffers /></Route>
            <Route path="/MyOffers"><MyOffers /></Route>
            <Route path="/RecommendedOffers"><RecommendedOffers /></Route>
            <Route path="/editOffer" ><EditOffer /></Route>
            <Route path="/detailsOffer" component={OfferDetails}></Route>
      </Router>
   </div>
  );
}

export default App;