import React from "react";
import { StyledMUIButton } from "../../General/Helpers";
import styles from "./ManageCampaignStepsPagination.module.css";
import { MANAGE_CAMPAIGN_DATA } from "./../../../Utils/staticData";

function ManageCampaignStepsPagination({
  currentState,
  totalStates,
  handleNext,
  handleBack,
  handleSave
}) {
  return (
    <div className={styles.Wrapper}>
      {currentState !== 0 && (
        <StyledMUIButton
          style={{ maxWidth: "17rem" }}
          fullWidth
          color="buttonGrey"
          onClick={handleBack}
        >
          {MANAGE_CAMPAIGN_DATA.back}
        </StyledMUIButton>
      )}
      {currentState < totalStates - 1 && (
        <StyledMUIButton
          style={{ maxWidth: "17rem" }}
          fullWidth
          color="buttonGreen"
          onClick={handleNext}
        >
          {MANAGE_CAMPAIGN_DATA.next}
        </StyledMUIButton>
      )}
      {currentState ===3 && (
        <StyledMUIButton
          style={{ maxWidth: "17rem" }}
          fullWidth
          color="buttonGreen"
          onClick={handleSave}
        >
        {MANAGE_CAMPAIGN_DATA.save}
      </StyledMUIButton>
      )}
      </div>
  );
}

export default ManageCampaignStepsPagination;
