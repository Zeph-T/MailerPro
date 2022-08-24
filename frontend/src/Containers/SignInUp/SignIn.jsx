import React from "react";
import StyledMUIInput from "./Helpers/StyledMUIInput";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import BottomText from "./Helpers/BottomText";
import { SIGN_IN_DATA as signInData } from "../../Utils/staticData";
import Styles from "./SignInUp.module.css";
import { StyledMUIButton } from "../../Components/General/Helpers";
import { login } from "../../Services/user.service";

function SignIn() {
  const [, setCookie] = useCookies();
  const location = useLocation();
  const formRef = React.useRef(123);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const userData = {
      email: formRef.current.elements.SignInEmail.value,
      password: formRef.current.elements.SignInPassword.value,
    };

    try {
      const response = await login(userData);
      console.log(response);
      setCookie("token", response.data.token, {
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
        <BottomText data={signInData} />
      </div>
    </div>
  );
}

export default SignIn;
