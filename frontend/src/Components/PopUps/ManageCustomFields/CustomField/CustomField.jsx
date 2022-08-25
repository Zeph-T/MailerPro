import React from "react";
import { StyledMUIButton, StyledMUISelect } from "../../../General/Helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CustomField.module.css";
import StyledMUITextField from "../../../General/Helpers/StyledMUITextField";
import { MANAGE_CUSTOM_FIELDS_POPUP_DATA } from "../../../../Utils/staticData";

const TagList = ({
  customField,
  handleNameChange,
  handleTypeChange,
  handleDelete,
  fieldIndex,
  isNew,
}) => {
  return (
    <div className={styles.Wrapper}>
      <StyledMUIButton
        color="buttonRed"
        style={{
          height: "100%",
          width: "5rem",
        }}
        onClick={() => {
          handleDelete(fieldIndex);
        }}
      >
        <DeleteIcon />
      </StyledMUIButton>
      <StyledMUITextField
        fullWidth
        value={customField.fieldName}
        onChange={(e) => {
          handleNameChange(e, fieldIndex);
        }}
        disabled={!isNew}
      />
      <StyledMUISelect
        value={customField.fieldType}
        options={MANAGE_CUSTOM_FIELDS_POPUP_DATA.typeOptions}
        onChange={(e) => {
          handleTypeChange(e, fieldIndex);
        }
      }
        disabled={!isNew}
      />
    </div>
  );
};

export default TagList;
