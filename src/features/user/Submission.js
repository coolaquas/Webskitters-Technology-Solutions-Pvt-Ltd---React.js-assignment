import React from "react";
import { useHistory } from "react-router-dom";
import "./Submission.css";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { resetAll, selectUserAddress, selectUserDetails } from "./userSlice";
import firebaseDb from "../../firebase";

function Submission({ back }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserDetails);
  const address = useSelector(selectUserAddress);

  const handleReset = () => {
    dispatch(resetAll());
  };
  const handleCancle = () => {
    dispatch(resetAll());
    history.goBack();
  };
  const handleSubmit = () => {
    //code
    const { firstName, lastName, phone, email, password } = userData;
    const { state, city, zip } = address;
    const new_user = {
      firstName,
      lastName,
      phone,
      email,
      password,
      state,
      city,
      zip,
    };
    console.log(new_user);
    firebaseDb
      .child("contacts")
      .push(new_user)
      .then((data) => {
        history.goBack();
        dispatch(resetAll());
        alert(`Thanks ${firstName} ${lastName}, your user id has been created`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="submission">
      Details taken
      <div className="button_container">
        <Button variant="contained" color="primary" onClick={back}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="primary" onClick={handleCancle}>
          Cancle
        </Button>
      </div>
    </div>
  );
}

export default Submission;
