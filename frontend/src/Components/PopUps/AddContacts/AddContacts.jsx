import React from "react";
import { ADD_CONTACTS_POPUP_DATA, CROSS_ICON } from "../../../Utils/staticData";
import styles from "./AddContacts.module.css";
import {
  StyledMUIButton,
  StyledMUIDateTimePicker,
} from "../../General/Helpers";
import { MenuItem } from "@mui/material";
import StyledMUISelectWithChip from "./../../General/Helpers/StyledMUISelectWithChip";
import StyledMUITextField from "./../../General/Helpers/StyledMUITextField";

const AddContacts = () => {
  const inputTextList = ADD_CONTACTS_POPUP_DATA.inputType[0].map(
    (input, index) => {
      return (
        <StyledMUITextField
          key={index}
          name={input.name}
          label={input.label}
          type={input.type}
        />
      );
    }
  );
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <p>{ADD_CONTACTS_POPUP_DATA.title}</p>
        <img src={CROSS_ICON} alt="cross" />
      </div>
      {inputTextList}
      <StyledMUIDateTimePicker
        name={ADD_CONTACTS_POPUP_DATA.inputType[1][0].name}
        label={ADD_CONTACTS_POPUP_DATA.inputType[1][0].label}
        renderInput={(params) => <StyledMUITextField {...params} />}
      />
      <StyledMUITextField
        select
        name={ADD_CONTACTS_POPUP_DATA.inputType[1][1].name}
        label={ADD_CONTACTS_POPUP_DATA.inputType[1][1].label}
      >
        {ADD_CONTACTS_POPUP_DATA.inputType[1][1].options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{
              color: option.color,
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledMUITextField>
      <StyledMUISelectWithChip
        label={ADD_CONTACTS_POPUP_DATA.inputType[1][2].label}
        options={ADD_CONTACTS_POPUP_DATA.inputType[1][2].options}
        getOptionLabel={(option) => option.label}
      />
      <StyledMUIButton color="buttonGreen" fullWidth>
        {ADD_CONTACTS_POPUP_DATA.button}
      </StyledMUIButton>
    </div>
  );
};

export default AddContacts;
