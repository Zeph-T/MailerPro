import React from "react";
import { Link } from "react-router-dom";

import { FOOTER_DATA, LOGO_ICON } from "./../../Utils/staticData";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.LeftSection}>
        <div className={styles.IconLinksWrapper}>
          {FOOTER_DATA.links.map((link, index) => (
            <a href={"http://localhost:3000"} key={index}>
              <img src={link.icon} alt={link.name} className={styles.Icon} />
            </a>
          ))}
        </div>
        <div className={styles.TermsWrapper}>
          <Link to="/" className={styles.Terms}>
            {FOOTER_DATA.privacyPolicy}
          </Link>
          <span className={styles.TermsBar}>{" | "}</span>
          <Link to="/" className={styles.Terms}>
            {FOOTER_DATA.termsOfUse}
          </Link>
        </div>
      </div>
      <div className={styles.RightSection}>
        <span className={styles.Copyright}>{FOOTER_DATA.copyright}</span>
        <a href="/" className={styles.Logo}>
          <img src={LOGO_ICON} alt="logo" className={styles.LogoIcon} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
