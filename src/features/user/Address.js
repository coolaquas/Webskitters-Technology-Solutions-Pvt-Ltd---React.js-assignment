import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./Address.css";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, selectUserAddress } from "./userSlice";
function Address({ back, next }) {
  const dispatch = useDispatch();
  const data = useSelector(selectUserAddress);
  const [notApproved, setNotApproved] = useState(
    data.notApproved === undefined ? true : data.notApproved
  );
  const [details, setDetails] = useState({
    state: data.state,
    city: data.city,
    zip: data.zip,
  });
  const [stateerror, setStateerror] = useState("");
  const [cityerror, setCityerror] = useState("");
  const [ziperror, setZiperror] = useState("");

  const validate = () => {
    let isError = false;
    setStateerror("");
    setCityerror("");
    setZiperror("");
    if (details.state === (undefined && "")) {
      isError = true;
      setStateerror("State is required");
    }
    if (details.city === (undefined && "")) {
      isError = true;
      setCityerror("State is required");
    }
    if (details.zip === (undefined && "")) {
      isError = true;
      setZiperror("State is required");
    }
    return isError;
  };
  const handleSave = () => {
    let err = validate();
    if (!err) {
      setNotApproved(false);
      const userAddress = { ...details, notApproved: false };
      dispatch(setAddress(userAddress));
      setStateerror("");
      setCityerror("");
      setZiperror("");
    }
  };
  const handlechange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <div className="address">
      <TextField
        id="outlined-basic 0"
        value={data.state}
        name="state"
        onChange={handlechange}
        className="input__box"
        label="State"
        variant="outlined"
        required
        error={Boolean(stateerror)}
        helperText={stateerror}
      />
      <TextField
        id="outlined-basic 1"
        value={data.city}
        name="city"
        onChange={handlechange}
        className="input__box"
        label="City"
        variant="outlined"
        required
        error={Boolean(cityerror)}
        helperText={cityerror}
      />
      <TextField
        id="outlined-basic 2"
        type="number"
        value={data.zip}
        name="zip"
        onChange={handlechange}
        className="input__box"
        label="Zip"
        variant="outlined"
        required
        error={Boolean(ziperror)}
        helperText={ziperror}
      />
      <div className="button_container">
        <Button variant="contained" color="primary" onClick={back}>
          Back
        </Button>
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

export default Address;
