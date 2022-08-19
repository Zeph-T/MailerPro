import React from "react";
import StyledMUIInput from "./Helpers/StyledMUIInput";
import { useLocation } from "react-router-dom";
import Button from "../../Components/Button";
import BottomText from "./Helpers/BottomText";
import { SIGN_IN_DATA as signInData } from "../../Utils/staticData";
import Styles from "./SignInUp.module.css";

function SignIn() {
  const location = useLocation();

  const formRef = React.useRef(123);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  return (
    <div
      className={Styles.Wrapper}
      style={{
        transform:
          location.pathname === "/signin"
            ? "translatex(0)"
            : "translatex(100%)",
      }}
    >
      <div className={Styles.UpperSection}>
        <span className={Styles.Title}>{signInData.title}</span>
        <form className={Styles.Form} onSubmit={signIn} ref={formRef}>
          <StyledMUIInput
            fullWidth
            id="SignInEmail"
            label="Email address"
            variant="standard"
            type="email"
            margin="dense"
            autoComplete="username"
            disabled={isDisabled}
          />
          <StyledMUIInput
            fullWidth
            id="SignInPassword"
            label="Password"
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
        <BottomText data={signInData} />
      </div>
    </div>
  );
}

export default SignIn;
