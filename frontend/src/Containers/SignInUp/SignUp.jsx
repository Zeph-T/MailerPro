import React from "react";
import StyledMUIInput from "./Helpers/StyledMUIInput";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

import Button from "../../Components/Button";
import BottomText from "./Helpers/BottomText";
import { SIGN_UP_DATA as signUpData } from "../../Utils/staticData";
import Styles from "./SignInUp.module.css";
import StyledMUIButton from "./../../Components/General/Helpers/StyledMUIButton";
import { register } from "../../Services/user.service";
import notify from "./../../Utils/helper/notifyToast";

function SignUp() {
  const [, setCookie] = useCookies();
  const location = useLocation();
  const formRef = React.useRef(123);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const userData = {
      name: formRef.current.elements.Name.value,
      email: formRef.current.elements.SignUpEmail.value,
      password: formRef.current.elements.SignUpPassword.value,
      confirmPassword: formRef.current.elements.ConfirmPassword.value,
    };

    if (userData.password !== userData.confirmPassword) {
      console.log("Password confirm password should be same");
      setIsDisabled(false);
      return notify("Password confirm password should be same", "error");
    }

    if (userData.password.length < 6) {
      console.log("Password should be of minimum length 6");
      setIsDisabled(false);
      return notify("Password should be of minimum length 6", "error");
    }
    try {
      delete userData.confirmPassword;
      const response = await register(userData);
      console.log(response);
      setCookie("token", response.token, {
        sameSite: "strict",
        path: "/",
      });
    } catch (e) {
      console.log(e);
      setIsDisabled(false);
      notify("Internal Server Error", "error");
    }
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
            id="Name"
            label="Name"
            variant="standard"
            disabled={isDisabled}
            required
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
            required
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
            required
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
            required
          />
          <StyledMUIButton
            fullWidth
            variant="contained"
            style={{
              boxShadow: "none",
              marginTop: "2rem",
            }}
            type="submit"
            disabled={isDisabled}
          >
            Continue
          </StyledMUIButton>
        </form>
      </div>
      <div className={Styles.BottomSecWrapper}>
        <BottomText data={signUpData} />
      </div>
    </div>
  );
}

export default SignUp;
