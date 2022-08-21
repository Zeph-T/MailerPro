import React from "react";
import { MANAGE_TAGS_POPUP_DATA, CROSS_ICON } from "../../../Utils/staticData";
import { StyledMUIButton } from "../../General/Helpers";

import styles from "./ManageTags.module.css";
import TagList from "./TagList";

const ManageTags = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <p>{MANAGE_TAGS_POPUP_DATA.title}</p>
        <img src={CROSS_ICON} alt="cross" />
      </div>
      <div className={styles.TagsWrapper}>
        <TagList />
        <TagList />
      </div>
      <StyledMUIButton
        color="buttonBlack"
        fullWidth
        style={{
          fontWeight: "400",
          padding: "1rem 2.5rem",
        }}
      >
        {MANAGE_TAGS_POPUP_DATA.buttons[0]}
      </StyledMUIButton>
      <div className={styles.LowerButtonWrapper}>
        <StyledMUIButton
          color="buttonGreen"
          fullWidth
          style={{
            fontWeight: "400",
            padding: "1rem 2.5rem",
          }}
        >
          {MANAGE_TAGS_POPUP_DATA.buttons[1]}
        </StyledMUIButton>
        <StyledMUIButton
          color="buttonRed"
          fullWidth
          style={{
            fontWeight: "400",
            padding: "1rem 2.5rem",
          }}
        >
          {MANAGE_TAGS_POPUP_DATA.buttons[2]}
        </StyledMUIButton>
      </div>
    </div>
  );
};

export default ManageTags;
