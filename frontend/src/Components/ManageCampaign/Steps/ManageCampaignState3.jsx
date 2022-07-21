import React from "react";
import styles from "./ManageCampaignState3.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";
import { RadioGroup } from "@mui/material";
import {
  StyledMUIFormControlLabel,
  StyledMUIRadio,
} from "../../General/Helpers";

function ManageCampaignState3({
  audience,
  handleAudienceChange,
  handleTagsChange,
}) {
  return (
    <div className={styles.Wrapper}>
      <RadioGroup
        name="audience"
        value={audience.value}
        onChange={handleAudienceChange}
      >
        {MANAGE_CAMPAIGN_DATA.steps[2].options.map((option, index) => (
          <StyledMUIFormControlLabel
            key={index}
            value={option.name}
            label={option.label}
            control={<StyledMUIRadio />}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default ManageCampaignState3;
