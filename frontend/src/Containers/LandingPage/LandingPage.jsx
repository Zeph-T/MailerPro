import React from "react";
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
    </div>
  );
};

export default LandingPage;
