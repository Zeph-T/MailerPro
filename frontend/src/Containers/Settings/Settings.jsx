import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyledMUIButton,
  StyledMUITextField,
} from "../../Components/General/Helpers";
import Header from "../../Components/Header";
import { SETTINGS_PAGE_DATA } from "../../Utils/staticData";
import {
  changePassword,
  updateUser,
  getAllAdmins,
  addAdmin,
  removeAdmin,
} from "../../Services/user.service";
import styles from "./Settings.module.css";
import notify from "./../../Utils/helper/notifyToast";
import { UPDATE_USER_DATA } from "../../Redux/ActionTypes";
import { useCookies } from "react-cookie";
import { MenuItem } from "@mui/material";

const TEMP_MAIL_LIST = [
  {
    email: "akash@gmail.com",
  },
  {
    email: "gupta@gmail.com",
  },
];

const Settings = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.userData);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [adminList, setAdminList] = useState(TEMP_MAIL_LIST);
  const [settings, setSettings] = useState({
    email: "",
    name: "",
    unSubscriptionForm: "",
    password: "",
    newPassword: "",
    newConfirmPassword: "",
    adminEmail: "",
    removeAdmin: "",
  });

  const [, , removeCookie] = useCookies(["token"]);

  const fetchAdminList = async () => {
    try {
      const { data } = await getAllAdmins(userData.accessToken);
      setAdminList(data);
    } catch (err) {
      notify("Fetching Admin List Failed", "error");
    }
  };

  useEffect(() => {
    if (isSuperAdmin && userData.accessToken) {
      fetchAdminList();
    }
  }, [isSuperAdmin, userData.accessToken]);

  useEffect(() => {
    if (userData) {
      setSettings({
        ...settings,
        email: userData.email,
        name: userData.name,
        unSubscriptionForm: userData.unSubscriptionForm,
      });
      if (userData.isAdmin === "superAdmin") {
        setIsSuperAdmin(true);
      }
    }
  }, [userData]);

  const handleInputChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonDisable = (button) => {
    if (button === "Save Personal Details") {
      return (
        settings.email === userData.email && settings.name === userData.name
      );
    } else if (button === "Save Form Info") {
      return settings.unSubscriptionForm === userData.unSubscriptionForm;
    } else if (button === "Update Password") {
      return (
        settings.password === "" ||
        settings.newPassword === "" ||
        settings.newConfirmPassword === ""
      );
    } else if (button === "Add New Admin") {
      return settings.adminEmail === "";
    } else if (button === "Remove Admin") {
      return settings.removeAdmin === "";
    }
    return true;
  };

  const handleDiscardClick = (button) => {
    if (button === "Save Personal Details") {
      setSettings({
        ...settings,
        email: userData.email,
        name: userData.name,
      });
    } else if (button === "Save Form Info") {
      setSettings({
        ...settings,
        unSubscriptionForm: userData.unSubscriptionForm,
      });
    } else if (button === "Update Password") {
      setSettings({
        ...settings,
        password: "",
        newPassword: "",
        newConfirmPassword: "",
      });
    } else if (button === "Add New Admin") {
      setSettings({
        ...settings,
        adminEmail: "",
      });
    } else if (button === "Remove Admin") {
      setSettings({
        ...settings,
        removeAdmin: "",
      });
    }
  };

  const handleButtonClick = async (button) => {
    if (button === "Save Personal Details") {
      try {
        await updateUser(
          {
            email: settings.email,
            name: settings.name,
          },
          userData.accessToken
        );
        dispatch({
          type: UPDATE_USER_DATA,
          data: {
            ...userData,
            email: settings.email,
            name: settings.name,
          },
        });
        return notify("Personal details updated successfully", "success");
      } catch (err) {
        return notify("Error updating personal details", "error");
      }
    } else if (button === "Save Form Info") {
      try {
        await updateUser(
          {
            unSubscriptionForm: settings.unSubscriptionForm,
          },
          userData.accessToken
        );
        dispatch({
          type: UPDATE_USER_DATA,
          data: {
            ...userData,
            unSubscriptionForm: settings.unSubscriptionForm,
          },
        });
        return notify("Form info updated successfully", "success");
      } catch (err) {
        return notify("Error updating form info", "error");
      }
    } else if (button === "Update Password") {
      try {
        await changePassword(
          {
            password: settings.password,
            newPassword: settings.newPassword,
            newConfirmPassword: settings.newConfirmPassword,
          },
          userData.accessToken
        );
        setSettings({
          ...settings,
          password: "",
          newPassword: "",
          newConfirmPassword: "",
        });
        return notify("Password updated successfully", "success");
      } catch (err) {
        return notify("Error updating password", "error");
      }
    } else if (button === "Add New Admin") {
      try {
        await addAdmin(settings.adminEmail, userData.accessToken);
        await fetchAdminList();
        setSettings({
          ...settings,
          adminEmail: "",
        });
        return notify("Admin added successfully", "success");
      } catch (err) {
        return notify("Error adding admin", "error");
      }
    } else if (button === "Remove Admin") {
      try {
        await removeAdmin(settings.removeAdmin, userData.accessToken);
        await fetchAdminList();
        setSettings({
          ...settings,
          removeAdmin: "",
        });
        return notify("Admin removed successfully", "success");
      } catch (err) {
        return notify("Error removing admin", "error");
      }
    }
  };

  const sectionMapList = SETTINGS_PAGE_DATA.sectionList.map(
    (section, index) => {
      if (
        (section.title === "Add New Admin" ||
          section.title === "Remove Admin") &&
        !isSuperAdmin
      ) {
        return null;
      }

      return (
        <div key={index} className={styles.SectionWrapper}>
          <h2 className={styles.InputWrapperHeading}>{section.title}</h2>
          <div className={styles.InputWrapper}>
            {section.inputRequired.map((input, index) => {
              return input.select ? (
                <StyledMUITextField
                  select
                  key={index}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  value={settings[input.name]}
                  onChange={handleInputChange}
                >
                  {adminList?.map((option) => (
                    <MenuItem key={option.email} value={option.email}>
                      {option.email}
                    </MenuItem>
                  ))}
                </StyledMUITextField>
              ) : (
                <StyledMUITextField
                  key={index}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  value={settings[input.name]}
                  onChange={handleInputChange}
                />
              );
            })}
          </div>
          <div className={styles.ButtonWrapper}>
            <StyledMUIButton
              color="buttonGreen"
              style={{
                padding: "1.2rem 2rem",
              }}
              disabled={handleButtonDisable(section.buttons)}
              onClick={() => handleButtonClick(section.buttons)}
            >
              {section.buttons}
            </StyledMUIButton>
            <div
              className={styles.DiscardButton}
              onClick={() => {
                handleDiscardClick(section.buttons);
              }}
            >
              Discard
            </div>
          </div>
        </div>
      );
    }
  );
  return (
    <div>
      <Header title={SETTINGS_PAGE_DATA.title} />
      {sectionMapList}
      <StyledMUIButton
        color="buttonRed"
        style={{
          padding: "1.2rem 2rem",
          marginTop: "2rem",
        }}
        onClick={() => {
          removeCookie("token", { path: "/" });
        }}
      >
        {SETTINGS_PAGE_DATA.logOut}
      </StyledMUIButton>
    </div>
  );
};

export default Settings;
