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
import { useSelector } from "react-redux";

const AddContacts = ({ isContactDetails = true }) => {
  const userTags = useSelector((state) => state.user.userData.tags);

  const inputTextList = ADD_CONTACTS_POPUP_DATA.inputType[0].map(
    (input, index) => {
      return (
        <StyledMUITextField
          key={index}
          name={input.name}
          label={input.label}
          type={input.type}
          disabled={isContactDetails}
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
        disabled={isContactDetails}
      />
      <StyledMUITextField
        select
        name={ADD_CONTACTS_POPUP_DATA.inputType[1][1].name}
        label={ADD_CONTACTS_POPUP_DATA.inputType[1][1].label}
        disabled={isContactDetails}
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
        options={userTags}
        // options={ADD_CONTACTS_POPUP_DATA.inputType[1][2].options}
        getOptionLabel={(option) => option.name}
        disabled={isContactDetails}
      />
      {isContactDetails ? (
        <>
          <StyledMUIButton color="buttonBlue" fullWidth>
            {ADD_CONTACTS_POPUP_DATA.buttonDetails[0]}
          </StyledMUIButton>
          <div className={styles.ButtonWrapper}>
            <StyledMUIButton color="buttonGreen" fullWidth>
              {ADD_CONTACTS_POPUP_DATA.buttonDetails[1]}
            </StyledMUIButton>
            <StyledMUIButton color="buttonRed" fullWidth>
              {ADD_CONTACTS_POPUP_DATA.buttonDetails[2]}
            </StyledMUIButton>
          </div>
        </>
      ) : (
        <StyledMUIButton color="buttonGreen" fullWidth>
          {ADD_CONTACTS_POPUP_DATA.button}
        </StyledMUIButton>
      )}
    </div>
  );
};

export default AddContacts;
