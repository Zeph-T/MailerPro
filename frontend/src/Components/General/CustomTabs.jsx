import { Button } from "@mui/material";
import React from "react";
import styles from "./CustomTabs.module.css";
import { StyledMUIButton } from "./Helpers";

function CustomTabs({ tabsData, handleClick, currentTab }) {
  return (
    <div className={styles.Wrapper}>
      {tabsData?.map((tab, index) => {
        return (
          <StyledMUIButton
            style={{
              padding: "0.7rem 2.5rem",
            }}
            onClick={() => {
              handleClick && handleClick(tab.value, index);
            }}
            variant={currentTab === tab.value ? "contained" : "outlined"}
          >
            {tab.label}
          </StyledMUIButton>
        );
      })}
    </div>
  );
}

export default CustomTabs;