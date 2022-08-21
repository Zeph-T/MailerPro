import React from "react";
import { Link } from "react-router-dom";
import { LANDING_PAGE_DATA } from "../../../Utils/staticData";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.Wrapper}>
      <img src={LANDING_PAGE_DATA.navbar.LOGO_ICON} alt="Logo" />
      <Link to="/signin">{LANDING_PAGE_DATA.navbar.loginText}</Link>
    </div>
  );
};

export default Navbar;
