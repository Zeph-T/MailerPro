import React from "react";
import { StyledMUIButton } from "../../../General/Helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TagList.module.css";

const TagList = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.UpperWrapper}>
        <StyledMUIButton
          color="buttonRed"
          style={{
            maxWidth: "17.5rem",
            fontWeight: "500",
            padding: "1rem 2.5rem",
          }}
        >
          <DeleteIcon />
        </StyledMUIButton>
        <StyledMUIButton
          color="buttonBlack"
          fullWidth
          style={{
            maxWidth: "35rem",
            minWidth: "35rem",
            fontWeight: "400",
            padding: "1rem 2.5rem",
            justifyContent: "flex-start",
          }}
        >
          hehe
        </StyledMUIButton>
      </div>
      <div className={styles.LowerWrapper}>3500</div>
    </div>
  );
};

export default TagList;
