import React, { useEffect, useState } from "react";
import {
  MANAGE_CUSTOM_FIELDS_POPUP_DATA,
  CROSS_ICON,
} from "../../../Utils/staticData";
import { StyledMUIButton } from "../../General/Helpers";
import styles from "./ManageCustomFields.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_POPUP_STATE,
  UPDATE_USER_DATA,
} from "../../../Redux/ActionTypes";
import notify from "../../../Utils/helper/notifyToast";
import CustomField from "./CustomField";
import {
  addCustomField,
  getAllCustomFields,
  removeCustomField,
} from "../../../Services/customField.service";

const ManageCustomFields = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [fieldsLocale, setFieldsLocale] = useState(userData.customFields);
  useEffect(() => {
    setFieldsLocale(JSON.parse(JSON.stringify(userData.customFields)));
  }, [userData.customFields]);
  console.log(fieldsLocale);
  const closePopup = () => {
    dispatch({
      type: UPDATE_POPUP_STATE,
      payload: {
        open: false,
        component: null,
      },
    });
  };

  const handleDelete = (fieldIndex) => {
    setFieldsLocale((prevState) => {
      return prevState.filter((_, index) => index !== fieldIndex);
    });
  };
  const handleNameChange = (e, tabIndex) => {
    setFieldsLocale((prevState) => {
      prevState[tabIndex].fieldName = e.target.value;
      return [...prevState];
    }),
      [tabIndex];
  };

  const handleTypeChange = (e, tabIndex) => {
    setFieldsLocale((prevState) => {
      prevState[tabIndex].fieldType = e.target.value;
      return [...prevState];
    }),
      [tabIndex];
  };

  const handleSave = async () => {
    const newFields = fieldsLocale.filter((field) => field._id === undefined);
    const deleteFields = userData.customFields.filter(
      (field, index) =>
        fieldsLocale.findIndex((t) => t._id === field._id) === -1
    );

    const createMap = newFields.map(async (field) => {
      try {
        await addCustomField(userData.accessToken, field);
      } catch (err) {
        notify("Error in adding Custom Field" + field.fieldName, "error");
      }
    });

    const deleteMap = deleteFields.map(async (field) => {
      try {
        await removeCustomField(userData.accessToken, field._id);
      } catch (err) {
        notify("Error in deleting Custom Field" + field.fieldName, "error");
      }
    });

    await Promise.all([...createMap, ...deleteMap]);
    notify("Custom Fields updated successfully", "success");
    const resp = await getAllCustomFields(userData.accessToken);
    dispatch({
      type: UPDATE_USER_DATA,
      data: {
        ...userData,
        customFields: resp.data.contactFields,
      },
    });
    closePopup();
    console.log(err);

    closePopup();
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <p>{MANAGE_CUSTOM_FIELDS_POPUP_DATA.title}</p>
        <img
          src={CROSS_ICON}
          alt="cross"
          onClick={closePopup}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.ListWrapper}>
        {fieldsLocale.map((customField, index) => (
          <CustomField
            key={customField.id}
            customField={customField}
            fieldIndex={index}
            handleDelete={handleDelete}
            handleNameChange={handleNameChange}
            handleTypeChange={handleTypeChange}
            isNew={customField._id === undefined}
          />
        ))}
      </div>
      <StyledMUIButton
        color="buttonBlack"
        fullWidth
        style={{
          fontWeight: "400",
          padding: "1rem 2.5rem",
        }}
        onClick={() => {
          setFieldsLocale((prevState) => {
            return [...prevState, { fieldName: "", fieldType: "Text" }];
          }),
            [fieldsLocale];
        }}
      >
        {MANAGE_CUSTOM_FIELDS_POPUP_DATA.buttons.add}
      </StyledMUIButton>
      <div className={styles.LowerButtonWrapper}>
        <StyledMUIButton
          color="buttonGreen"
          fullWidth
          style={{
            fontWeight: "400",
            padding: "1rem 2.5rem",
          }}
          onClick={handleSave}
        >
          {MANAGE_CUSTOM_FIELDS_POPUP_DATA.buttons.save}
        </StyledMUIButton>
        <StyledMUIButton
          color="buttonRed"
          fullWidth
          style={{
            fontWeight: "400",
            padding: "1rem 2.5rem",
          }}
          onClick={() => {
            setFieldsLocale(userData.customFields);
          }}
        >
          {MANAGE_CUSTOM_FIELDS_POPUP_DATA.buttons.discard}
        </StyledMUIButton>
      </div>
    </div>
  );
};

export default ManageCustomFields;
