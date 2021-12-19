import React, {  } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OffersTable from "./OffersTable";

function MyOffers() {
  const history = useHistory();
  const user = useSelector(state => state.User);

  return (
    <div>
      {!user.user.role ? <div>{history.push("login")}</div>:
        <React.Fragment>
          <div style={{ padding: "30px" }}>
            <OffersTable MyOffers={true}/>
          </div>
        </React.Fragment>
        
      }
    </div>
  );
}
export default MyOffers;

