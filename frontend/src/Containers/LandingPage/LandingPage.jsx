import React from "react";
import LandingPageFooter from "../../Components/LandingPage/LandingPageFooter/LandingPageFooter";
import MiddleContainer from "../../Components/LandingPage/MiddleContainer";
import Navbar from "../../Components/LandingPage/Navbar";
import UpperContainer from "../../Components/LandingPage/UpperContainer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <UpperContainer />
      <MiddleContainer />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;
