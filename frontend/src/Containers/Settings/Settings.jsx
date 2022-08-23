import React from "react";
import {
  StyledMUIButton,
  StyledMUITextField,
} from "../../Components/General/Helpers";
import Header from "../../Components/Header";
import { SETTINGS_PAGE_DATA } from "../../Utils/staticData";
import styles from "./Settings.module.css";

const Settings = () => {
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
            >
              {section.buttons}
            </StyledMUIButton>
            <div className={styles.DiscardButton}>Discard</div>
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
