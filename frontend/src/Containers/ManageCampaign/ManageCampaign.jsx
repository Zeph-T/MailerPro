import React from "react";

import { useSelector } from "react-redux";

import styles from "./ManageCampaign.module.css";

const ManageCampaign = ({ isNew }) => {
  return (
    <div className={styles.container}>
      <h1>{isNew ? "New Campaign" : "Manage Campaign"}</h1>
    </div>
  );
};

export default ManageCampaign;
