import React from "react";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails, resetAll } from "../user/userSlice";
import { Button } from "@material-ui/core";

function Dashboard() {
  const data = useSelector(selectUserDetails);
  let { firstName, lastName, city, email, phone, zip, state } = data;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(resetAll());
    history.goBack();
  };
  return (
    <div className="dashboard">
      <h1>This is User Dashboard</h1>
      <div className="dashboard__datacontainer">
        <h3 className="dashboard__dataheader">
          Welcome back, {firstName} {lastName}{" "}
        </h3>

        <h5>Please find your details below</h5>

        <div className="container__data">First Name : {firstName}</div>
        <div className="container__data">Last Name : {lastName}</div>
        <div className="container__data">Email id : {email}</div>
        <div className="container__data">Phone : +91 {phone}</div>
        {"Address Details"}
        <div className="container__data">State : {state}</div>
        <div className="container__data">City : {city}</div>
        <div className="container__data">Zip Code : {zip}</div>
        <center>
          <Button
            variant="contained"
            color="primary"
            className="btn__logout"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </center>
      </div>
    </div>
  );
}

export default Dashboard;
