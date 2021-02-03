import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import "./Signup.css";
import Name from "../user/Name";
import Address from "../user/Address";
import Submission from "../user/Submission";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStep,
  setStep,
  selectUserDetails,
  selectUserAddress,
} from "../user/userSlice";

function Signup() {
  const dispatch = useDispatch();
  const detailsApproval = useSelector(selectUserDetails);
  const addressApproval = useSelector(selectUserAddress);
  const step = useSelector(selectStep);

  const handleBack = () => {
    if (step > 1) dispatch(setStep(step - 1));
    setStep(step - 1);
  };
  const handleNext = () => {
    if (step < 3) dispatch(setStep(step + 1));
  };
  return (
    <div className="signup">
      <div className="signup__headers">
        <Button
          value="1"
          onClick={(e) => dispatch(setStep(parseInt(e.currentTarget.value)))}
        >
          {step > 1 && "✅"}Name
        </Button>
        <span className={`devider${step > 1 ? "__active" : ""}`}></span>
        <Button
          value="2"
          onClick={(e) => dispatch(setStep(parseInt(e.currentTarget.value)))}
        >
          {step > 2 && "✅"}Address
        </Button>
        <span className={`devider${step > 2 ? "__active" : ""}`}></span>

        <Button
          value="3"
          onClick={(e) => dispatch(setStep(parseInt(e.currentTarget.value)))}
        >
          Submission
        </Button>
      </div>

      {step === 1 && <Name next={handleNext} />}
      {step === 2 && detailsApproval.notApproved === false && (
        <Address next={handleNext} back={handleBack} />
      )}
      {step === 3 &&
        detailsApproval.notApproved === false &&
        addressApproval.notApproved === false && (
          <Submission back={handleBack} />
        )}
    </div>
  );
}

export default Signup;
