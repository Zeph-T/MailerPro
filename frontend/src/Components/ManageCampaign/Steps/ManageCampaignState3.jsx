import React from "react";
import styles from "./ManageCampaignState3.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";
import { RadioGroup } from "@mui/material";
import {
  StyledMUIFormControlLabel,
  StyledMUIRadio,
} from "../../General/Helpers";
import StyledMUISelectWithChip from "./../../General/Helpers/StyledMUISelectWithChip";

const TMPTagsOptions = [
  {
    name: "Tag 1",
    _id: "tag1",
  },
  {
    name: "Tag 2",
    _id: "tag2",
  },
];

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
      {audience.value === "selected" && (
        <StyledMUISelectWithChip
          label={MANAGE_CAMPAIGN_DATA.steps[2].tags}
          placeholder={MANAGE_CAMPAIGN_DATA.steps[2].selectTags}
          value={audience.tags}
          onChange={handleTagsChange}
          options={TMPTagsOptions}
          getOptionLabel={(option) => option.name}
        />
      )}
    </div>
  );
}

export default ManageCampaignState3;
