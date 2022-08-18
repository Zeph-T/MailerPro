import React from "react";
import { LANDING_PAGE_DATA } from "../../../Utils/staticData";
import styles from "./MiddleContainer.module.css";

const MiddleContainer = () => {
  return (
    <div className={styles.Wrapper}>
      <img
        src={LANDING_PAGE_DATA.middleContainer.EllipseImage}
        alt="Ellipse"
        className={styles.EllipseImage}
      />
      <img
        src={LANDING_PAGE_DATA.middleContainer.MiddleDots}
        alt="Middle Dots"
        className={styles.MiddleDots}
      />
      <div className={styles.SubWrapper}>
        <img
          src={LANDING_PAGE_DATA.middleContainer.MiddleImage}
          alt="Middle Img"
        />
        <div>{LANDING_PAGE_DATA.middleContainer.title}</div>
      </div>
    </div>
  );
};

export default MiddleContainer;
