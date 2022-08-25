import React from "react";
import styles from "./ManageCampaignState1.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";
import { StyledMUITextField } from "./../../General/Helpers";

function ManageCampaignState1({
  campaignInfo,
  handleCampaignInfoChange,
  isSMS,
}) {
  return (
    <div className={styles.Wrapper}>
      {MANAGE_CAMPAIGN_DATA.steps[0].inputs
        .slice(0, isSMS ? 2 : 6)
        .map((input, index) => {
          return (
            <StyledMUITextField
              required={input.required}
              name={input.name}
              label={input.label}
              placeholder={input.placeholder}
              type={input.type}
              key={index}
              value={campaignInfo[input.name]}
              onChange={handleCampaignInfoChange}
            />
          );
        })}
    </div>
  );
}

export default ManageCampaignState1;
