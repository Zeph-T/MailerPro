import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LandingPageFooter from "../../Components/LandingPage/LandingPageFooter/LandingPageFooter";
import MiddleContainer from "../../Components/LandingPage/MiddleContainer";
import Navbar from "../../Components/LandingPage/Navbar";
import UpperContainer from "../../Components/LandingPage/UpperContainer";
import SignIn from "../SignInUp/SignIn";
import SignUp from "../SignInUp/SignUp";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  // const history = useHistory();

  const signInUpWrapperRef = React.useRef(123);

  const handleBgOnClick = (e) => {
    if (signInUpWrapperRef.current === e.target) {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (Location.pathname !== "/") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <UpperContainer />
      <MiddleContainer />
      <LandingPageFooter />
      <div
        ref={signInUpWrapperRef}
        className={styles.SignInUpWrapper}
        onClick={handleBgOnClick}
        style={{
          background: Location.pathname !== "/" ? "rgba(0, 0, 0, 0.4)" : "none",
          pointerEvents: Location.pathname !== "/" ? "all" : "none",
        }}
      >
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default LandingPage;
