import React from "react";
import StyledMUIInput from "./Helpers/StyledMUIInput";
import { useLocation } from "react-router-dom";

import Button from "../../Components/Button";
import BottomText from "./Helpers/BottomText";
import { SIGN_UP_DATA as signUpData } from "../../Utils/staticData";
import Styles from "./SignInUp.module.css";

function SignUp() {
  const location = useLocation();
  const formRef = React.useRef(123);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [values, setValues] = React.useState({
    textmask: "",
    numberformat: "",
    Mobile: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  return (
    <div
      className={Styles.Wrapper}
      style={{
        transform:
          location.pathname === "/signup"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>{signUpData.title}</span>
        <form ref={formRef} className={Styles.Form} onSubmit={signUp}>
          <StyledMUIInput
            fullWidth
            id="firstName"
            label="First Name"
            variant="standard"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="lastName"
            label="Last Name"
            variant="standard"
            margin="dense"
            autoComplete="last name"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="SignUpEmail"
            label="Email address"
            variant="standard"
            type="email"
            margin="dense"
            autoComplete="username"
            disabled={isDisabled}
          />

          <StyledMUIInput
            fullWidth
            id="SignUpPassword"
            label="Password"
            variant="standard"
            type="password"
            margin="dense"
            autoComplete="current-password"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="ConfirmPassword"
            label="Confirm Password"
            variant="standard"
            type="password"
            margin="dense"
            autoComplete="current-password"
            disabled={isDisabled}
          />
          <Button
            content="Continue"
            mainColor="#0079F1"
            fontSize="var(--font-16)"
            wrapperClass={Styles.SignInUpButton}
          />
        </form>
      </div>
      <div className={Styles.BottomSecWrapper}>
        <BottomText data={signUpData} />
      </div>
    </div>
  );
}

export default SignUp;
