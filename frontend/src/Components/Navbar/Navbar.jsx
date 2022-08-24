import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { NAVBAR_DATA } from "../../Utils/staticData";

function Navbar() {
  const [activeLink, setActiveLink] = React.useState(null);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.MenuIcon}>
        <img src={NAVBAR_DATA.menuIcon} alt="menu icon" />
      </div>
      <div className={styles.NavLinksWrapper}>
        {NAVBAR_DATA.navLinks.map((link, index) => {
          return (
            <NavLink
              key={index}
              to={link.path}
              className={(status) => {
                status.isActive && setActiveLink(link.path);
                !status.isActive &&
                  activeLink === link.path &&
                  setActiveLink(null);
                return styles.NavLink;
              }}
            >
              <div
                className={
                  styles.NavLinkIconWrapper +
                  " " +
                  (activeLink === link.path
                    ? styles.NavLinkIconWrapperActive
                    : "")
                }
              >
                <img
                  src={link.icon}
                  alt="nav link icon"
                  className={styles.NavLinkIcon}
                />
                <img
                  src={link.iconActive}
                  style={{
                    opacity: activeLink === link.path ? 1 : 0,
                  }}
                  alt="nav link icon"
                  className={styles.NavLinkIcon}
                />
              </div>
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
