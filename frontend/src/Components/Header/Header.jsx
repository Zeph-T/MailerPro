import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import { BACK_ARROW_ICON } from "./../../Utils/staticData";

function Header({
  withBackButton = false,
  link,
  onClick,
  title,
  subTitle,
  rightSecContent,
}) {
  return ( 
    <div className={styles.Wrapper}>
      {link ? (
        <Link className={styles.TitleWrapper} to={link} onClick={onClick}>
          {withBackButton && (
            <img src={BACK_ARROW_ICON} className={styles.LogoIcon} alt="logo" />
          )}
          <h1>{title}</h1>
        </Link>
      ) : (
        <div className={styles.TitleWrapper} onClick={onClick}>
          {withBackButton && (
            <img src={BACK_ARROW_ICON} className={styles.LogoIcon} alt="logo" />
          )}
          <h1>{title}</h1>
        </div>
      )}
      {subTitle && <h3>{subTitle}</h3>}
    </div>
  );
}

export default Header;
