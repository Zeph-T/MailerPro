import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import { BACK_ARROW_ICON } from "./../../Utils/staticData";

function Header({ withBackButton = false, link, onClick, title }) {
  return link ? (
    <Link className={styles.Wrapper} to={link} onClick={onClick}>
      {withBackButton && (
        <img src={BACK_ARROW_ICON} className={styles.LogoIcon} alt="logo" />
      )}
      <h1>{title}</h1>
    </Link>
  ) : (
    <div className={styles.Wrapper} onClick={onClick}>
      {withBackButton && (
        <img src={BACK_ARROW_ICON} className={styles.LogoIcon} alt="logo" />
      )}
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
