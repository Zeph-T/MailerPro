import React from "react";
import { StyledMUIButton } from "../../../General/Helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TagList.module.css";
import StyledMUITextField from "./../../../General/Helpers/StyledMUITextField";

const TagList = ({ tag, handleChange, handleDelete, tagIndex }) => {
  return (
    <div className={styles.Wrapper}>
      <StyledMUIButton
        color="buttonRed"
        style={{
          height: "100%",
          width: "5rem",
        }}
        onClick={() => {
          handleDelete(tagIndex);
        }}
      >
        <DeleteIcon />
      </StyledMUIButton>
      <StyledMUITextField
        fullWidth
        value={tag.name}
        onChange={(e) => {
          handleChange(e, tagIndex);
        }}
      />
    </div>
  );
};

export default TagList;
