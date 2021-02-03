import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./Name.css";
import { useDispatch, useSelector } from "react-redux";
import { setuserDetails, selectUserDetails } from "./userSlice";
function Name({ next }) {
  const dispatch = useDispatch();

  const data = useSelector(selectUserDetails);
  const [notApproved, setNotApproved] = useState(
    data.notApproved === undefined ? true : data.notApproved
  );
  const [details, setDetails] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
    confPassword: data.confPassword,
  });
  const [errorfirstName, setErrorfirstName] = useState("");
  const [errorlastName, setErrorlastName] = useState("");
  const [erroremail, setErroremail] = useState("");
  const [errorphone, setErrorphone] = useState("");
  const [errorpassword, setErrorpassword] = useState("");
  const [errorconfPassword, setErrorconfPassword] = useState("");

  const validate = () => {
    let isError = false;
    setErrorfirstName("");
    setErrorlastName("");
    setErroremail("");
    setErrorphone("");
    setErrorpassword("");
    setErrorconfPassword("");

    if (details.firstName === (undefined && "")) {
      isError = true;
      setErrorfirstName("First name is required");
    }

    if (details.lastName === (undefined && "")) {
      isError = true;
      setErrorlastName("First name is required");
    }
    if (details.email === (undefined && "")) {
      isError = true;
      setErroremail("Email cann't be empty.");
    } else if (details.email.indexOf("@") === -1) {
      isError = true;
      setErroremail("Requires valid email");
    }
    if (details.phone === (undefined && "")) {
      isError = true;
      setErrorphone("Phone is required");
    } else if (details.phone?.length !== 10) {
      setErrorphone("Please provide proper phone number");
    }
    if (details.password === undefined || details.password?.length <= 6) {
      isError = true;
      setErrorpassword("Password must be minimum 6 charectors");
    }
    if (details.confPassword === (undefined && "")) {
      isError = true;
      setErrorconfPassword("Please confirm your password");
    } else if (details.confPassword !== details.password) {
      isError = true;
      setErrorconfPassword("Password do not match");
    }
    return isError;
  };

  const handleSave = () => {
    let err = validate();
    if (!err) {
      setNotApproved(false);
      const userData = { ...details, notApproved: false };
      dispatch(setuserDetails(userData));
      setErrorfirstName("");
      setErrorlastName("");
      setErroremail("");
      setErrorphone("");
      setErrorpassword("");
      setErrorconfPassword("");
    }
  };

  const handlechange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <div className="name">
      <TextField
        id="outlined-basic 1"
        value={details.firstName}
        name="firstName"
        onChange={handlechange}
        className="input__box"
        label="First Name"
        variant="outlined"
        required
        error={Boolean(errorfirstName)}
        helperText={errorfirstName}
      />
      <TextField
        id="outlined-basic 2"
        value={details.lastName}
        name="lastName"
        onChange={handlechange}
        className="input__box"
        label="Last Name"
        variant="outlined"
        required
        error={Boolean(errorlastName)}
        helperText={errorlastName}
      />
      <TextField
        id="outlined-basic 3"
        value={details.email}
        name="email"
        onChange={handlechange}
        className="input__box"
        label="Email"
        variant="outlined"
        required
        error={Boolean(erroremail)}
        helperText={erroremail}
      />
      <TextField
        id="outlined-basic 4"
        value={details.phone}
        name="phone"
        type="number"
        onChange={handlechange}
        className="input__box"
        label="Phone"
        variant="outlined"
        required
        error={Boolean(errorphone)}
        helperText={errorphone}
      />
      <TextField
        id="outlined-basic 5"
        value={details.password}
        name="password"
        onChange={handlechange}
        className="input__box"
        label="Password"
        type="password"
        variant="outlined"
        required
        error={Boolean(errorpassword)}
        helperText={errorpassword}
      />
      <TextField
        id="outlined-basic 6"
        value={details.confPassword}
        name="confPassword"
        onChange={handlechange}
        className="input__box"
        label="Confirm Password"
        type="password"
        variant="outlined"
        required
        error={Boolean(errorconfPassword)}
        helperText={errorconfPassword}
      />
      <div className="button_container">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button
          disabled={notApproved}
          variant="contained"
          color="primary"
          onClick={next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Name;
