import React, { useEffect, useState } from "react";
import { ADD_CONTACTS_POPUP_DATA, CROSS_ICON } from "../../../Utils/staticData";
import styles from "./AddContacts.module.css";
import {
  StyledMUIButton,
  StyledMUIDateTimePicker,
} from "../../General/Helpers";
import { MenuItem } from "@mui/material";
import StyledMUISelectWithChip from "./../../General/Helpers/StyledMUISelectWithChip";
import StyledMUITextField from "./../../General/Helpers/StyledMUITextField";
import { useDispatch, useSelector } from "react-redux";
import { addContact, updateContact } from "../../../Services/contact.service";
import notify from "./../../../Utils/helper/notifyToast";
import { UPDATE_POPUP_STATE } from "../../../Redux/ActionTypes";

const AddContacts = ({
  isContactDetails = true,
  contactData,
  fetchCurrentPageData,
}) => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    tags: [],
  });

  useEffect(() => {
    if (contactData) {
      setValues(contactData);
    }
  }, [contactData]);

  const closePopup = () => {
    fetchCurrentPageData();
    dispatch({
      type: UPDATE_POPUP_STATE,
      payload: {
        open: false,
        component: null,
      },
    });
  };

  const handleUpdate = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      if (isContactDetails) {
        await updateContact(userData.accessToken, values);
        notify("Contact added successfully", "success");
      } else {
        await addContact(userData.accessToken, values);
        notify("Contact updated successfully", "success");
      }
      closePopup();
    } catch (err) {
      console.log(err);
      notify("Error adding contact", "error");
    }
  };

  const inputTextList = ADD_CONTACTS_POPUP_DATA.inputType[0].map(
    (input, index) => {
      return (
        <StyledMUITextField
          key={index}
          name={input.name}
          label={input.label}
          type={input.type}
          onChange={handleUpdate}
          value={values[input.name]}
        />
      );
    }
  );

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);
  return (
    <form className={styles.Wrapper} onSubmit={handleAddContact}>
      <div className={styles.Header}>
        <p>
          {isContactDetails
            ? ADD_CONTACTS_POPUP_DATA.titleUpdate
            : ADD_CONTACTS_POPUP_DATA.title}
        </p>
        <img src={CROSS_ICON} alt="cross" onClick={closePopup} />
      </div>
      {inputTextList}
      <StyledMUIDateTimePicker
        name={ADD_CONTACTS_POPUP_DATA.inputType[1][0].name}
        label={ADD_CONTACTS_POPUP_DATA.inputType[1][0].label}
        renderInput={(params) => <StyledMUITextField {...params} />}
        onChange={handleUpdate}
        value={values[ADD_CONTACTS_POPUP_DATA.inputType[1][0].name]}
      />
      <StyledMUITextField
        select
        name={ADD_CONTACTS_POPUP_DATA.inputType[1][1].name}
        label={ADD_CONTACTS_POPUP_DATA.inputType[1][1].label}
        onChange={handleUpdate}
        value={values[ADD_CONTACTS_POPUP_DATA.inputType[1][1].name]}
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
        options={userData.tags}
        getOptionLabel={(option) => option.name}
        onChange={(e, val) => {
          setValues({
            ...values,
            tags: val,
          });
        }}
        value={values.tags}
      />
      {isContactDetails ? (
        <>
          {/* <StyledMUIButton color="buttonBlue" fullWidth>
            {ADD_CONTACTS_POPUP_DATA.buttonDetails[0]}
          </StyledMUIButton> */}
          <div className={styles.ButtonWrapper}>
            <StyledMUIButton color="buttonGreen" fullWidth type="submit">
              {ADD_CONTACTS_POPUP_DATA.buttonDetails[1]}
            </StyledMUIButton>
            <StyledMUIButton color="buttonRed" fullWidth>
              {ADD_CONTACTS_POPUP_DATA.buttonDetails[2]}
            </StyledMUIButton>
          </div>
        </>
      ) : (
        <StyledMUIButton type="submit" color="buttonGreen" fullWidth>
          {ADD_CONTACTS_POPUP_DATA.button}
        </StyledMUIButton>
      )}
    </form>
  );
};

export default AddContacts;
