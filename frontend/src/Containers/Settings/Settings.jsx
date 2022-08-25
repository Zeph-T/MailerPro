import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyledMUIButton,
  StyledMUITextField,
} from "../../Components/General/Helpers";
import Header from "../../Components/Header";
import { SETTINGS_PAGE_DATA } from "../../Utils/staticData";
import styles from "./Settings.module.css";

const Settings = () => {
  const userData = useSelector((state) => state.user?.userData);
  const [settings, setSettings] = useState({
    email: "",
    name: "",
    unSubscriptionForm: "",
    password: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  useEffect(() => {
    if (userData) {
      setSettings({
        ...settings,
        email: userData.email,
        name: userData.name,
        unSubscriptionForm: userData.unSubscriptionForm,
      });
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
    }
  };

  const sectionMapList = SETTINGS_PAGE_DATA.sectionList.map(
    (section, index) => {
      return (
        <div key={index} className={styles.SectionWrapper}>
          <h2 className={styles.InputWrapperHeading}>{section.title}</h2>
          <div className={styles.InputWrapper}>
            {section.inputRequired.map((input, index) => {
              return (
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
    </div>
  );
};

export default Settings;
