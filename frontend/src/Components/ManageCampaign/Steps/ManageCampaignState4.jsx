import React from "react";
import styles from "./ManageCampaignState4.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";
import { RadioGroup } from "@mui/material";
import {
  StyledMUIFormControlLabel,
  StyledMUIRadio,
  StyledMUIDateTimePicker,
} from "../../General/Helpers";

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

function ManageCampaignState4({
  schedule,
  hnadleScheduleChange,
  handleScheduleTimeChange,
}) {
  return (
    <div className={styles.Wrapper}>
      <RadioGroup
        name="schedule"
        value={schedule.value}
        onChange={hnadleScheduleChange}
      >
        {MANAGE_CAMPAIGN_DATA.steps[3].options.map((option, index) => (
          <StyledMUIFormControlLabel
            key={index}
            value={option.name}
            label={option.label}
            control={<StyledMUIRadio />}
          />
        ))}
      </RadioGroup>
      {schedule.value === "later" && (
        <div>
          <StyledMUIDateTimePicker
            onChange={handleScheduleTimeChange}
            label={MANAGE_CAMPAIGN_DATA.steps[3].dateAndTime}
            placeholder={MANAGE_CAMPAIGN_DATA.steps[3].selectDateAndTime}
            value={schedule.time}
          />
        </div>
      )}
    </div>
  );
}

export default ManageCampaignState4;
