import React from "react";
import Navbar from "../../Components/LandingPage/Navbar";
import UpperContainer from "../../Components/LandingPage/UpperContainer";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <UpperContainer />
    </div>
  );
};

export default LandingPage;
