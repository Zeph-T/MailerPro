import React from "react";

import styles from "./ManageCampaignState.module.css";

import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";

function ManageCampaignState({ currentState }) {
  return (
    <div className={styles.Wrapper}>
      {MANAGE_CAMPAIGN_DATA.steps.map((state, index) => {
        return (
          <div key={index} className={styles.State}>
            <div
              className={
                styles.StateNumber +
                " " +
                (index <= currentState ? styles.StateNumberActive : "")
              }
            >
              {index + 1}
            </div>
            <div
              className={
                styles.StateName +
                " " +
                (index <= currentState ? styles.StateNameActive : "")
              }
            >
              {state.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ManageCampaignState;
