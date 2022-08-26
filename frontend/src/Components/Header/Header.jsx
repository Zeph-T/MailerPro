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
  subTitleStyles,
}) {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Leftwrapper}>
        {link ? (
          <Link className={styles.TitleWrapper} to={link} onClick={onClick}>
            {withBackButton && (
              <img
                src={BACK_ARROW_ICON}
                className={styles.LogoIcon}
                alt="logo"
              />
            )}
            <h1>{title}</h1>
          </Link>
        ) : (
          <div className={styles.TitleWrapper} onClick={onClick}>
            {withBackButton && (
              <img
                src={BACK_ARROW_ICON}
                className={styles.LogoIcon}
                alt="logo"
              />
            )}
            <h1>{title}</h1>
          </div>
        )}
        {subTitle && <h4 style={subTitleStyles}>{subTitle}</h4>}
      </div>
      {rightSecContent && (
        <div className={styles.Rightwrapper}>{rightSecContent}</div>
      )}
    </div>
  );
}

export default Header;
