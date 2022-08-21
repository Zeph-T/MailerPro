import React from "react";
import { useNavigate } from "react-router-dom";
import { LANDING_PAGE_DATA } from "../../../Utils/staticData";
import { StyledMUIButton } from "../../General/Helpers";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "./UpperContainer.module.css";

const UpperContainer = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Wrapper}>
      <div className={styles.UpperWrapper}>
        <div className={styles.UpperWrapperLeft}>
          <div className={styles.UpperWrapperLeftLeft}>
            {LANDING_PAGE_DATA.upperContainer.title}
          </div>
          <StyledMUIButton
            color="buttonBlack"
            style={{
              maxWidth: "17.5rem",
              fontWeight: "500",
              padding: "1rem 2.5rem",
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            {LANDING_PAGE_DATA.upperContainer.button}
            <ArrowRightAltIcon
              style={{
                marginLeft: "0.5rem",
              }}
            />
          </StyledMUIButton>
        </div>
        <img
          src={LANDING_PAGE_DATA.upperContainer.UpperImage}
          alt="Upper Img"
          className={styles.UpperWrapperImg}
        />
      </div>
      <img
        src={LANDING_PAGE_DATA.upperContainer.CircleDesignBlue}
        alt="blue design"
        className={styles.CircleDesignBlue}
      />
      <img
        src={LANDING_PAGE_DATA.upperContainer.CircleDesignYellow}
        alt="yellow design"
        className={styles.CircleDesignYellow}
      />
    </div>
  );
};

export default UpperContainer;
