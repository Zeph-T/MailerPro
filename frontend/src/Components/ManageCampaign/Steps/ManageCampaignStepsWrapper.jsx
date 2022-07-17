import React from "react";

import styles from "./ManageCampaignStepsWrapper.module.css";
function ManageCampaignStepsWrapper({ children }) {
  return <div className={styles.Wrapper}>{children}</div>;
}

export default ManageCampaignStepsWrapper;
