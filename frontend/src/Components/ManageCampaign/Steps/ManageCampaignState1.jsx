import React from "react";
import styles from "./ManageCampaignState1.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";
import { StyledMUITextField } from "./../../General/Helpers";

function ManageCampaignState1() {
  return (
    <div className={styles.Wrapper}>
      {MANAGE_CAMPAIGN_DATA.steps[0].inputs.map((input, index) => {
        return (
          <StyledMUITextField
            required={input.required}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default ManageCampaignState1;
