import React from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import ManageCampaignState from "./../../Components/ManageCampaign/ManageCampaignState";
import styles from "./ManageCampaign.module.css";
import { MANAGE_CAMPAIGN_DATA } from "./../../Utils/staticData";
import {
  ManageCampaignStepsWrapper,
  ManageCampaignStepsPagination,
  ManageCampaignState1,
  ManageCampaignState2,
} from "./../../Components/ManageCampaign/Steps";

const ManageCampaign = ({ isNew }) => {
  const [currentState, setCurrentState] = React.useState(1);

  const handleNext = () => {
    setCurrentState(currentState + 1);
  };
  const handleBack = () => {
    setCurrentState(currentState - 1);
  };

  return (
    <div className={styles.container}>
      <Header
        title={
          isNew
            ? MANAGE_CAMPAIGN_DATA.createCampaign
            : MANAGE_CAMPAIGN_DATA.manageCampaign
        }
        withBackButton
        link="/campaigns"
      />
      <ManageCampaignState currentState={currentState} />
      <ManageCampaignStepsWrapper>
        {currentState === 0 && <ManageCampaignState1 />}
        {currentState === 1 && <ManageCampaignState2 />}
        <ManageCampaignStepsPagination
          currentState={currentState}
          totalStates={4}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      </ManageCampaignStepsWrapper>
    </div>
  );
};

export default ManageCampaign;
