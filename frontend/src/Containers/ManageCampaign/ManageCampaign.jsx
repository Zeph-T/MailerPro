import React, { useEffect } from "react";
import Header from "../../Components/Header";
import ManageCampaignState from "./../../Components/ManageCampaign/ManageCampaignState";
import styles from "./ManageCampaign.module.css";
import { MANAGE_CAMPAIGN_DATA } from "./../../Utils/staticData";
import { createCampaign } from "../../Services/campaign.service";
import notify from "./../../Utils/helper/notifyToast";
import { useDispatch, useSelector } from "react-redux";
import {
  ManageCampaignStepsWrapper,
  ManageCampaignStepsPagination,
  ManageCampaignState1,
  ManageCampaignState2,
  ManageCampaignState3,
  ManageCampaignState4,
} from "./../../Components/ManageCampaign/Steps";

import IMG1 from "../../Assets/TMP/website templates/1.jpg";
import IMG2 from "../../Assets/TMP/website templates/2.jpg";
import IMG3 from "../../Assets/TMP/website templates/3.jpg";
import IMG4 from "../../Assets/TMP/website templates/4.jpg";
import IMG5 from "../../Assets/TMP/website templates/5.jpg";
import IMG6 from "../../Assets/TMP/website templates/6.jpg";
import IMG7 from "../../Assets/TMP/website templates/7.jpg";
import IMG8 from "../../Assets/TMP/website templates/8.jpg";

const tempTemplates = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7, IMG8].map(
  (template, _id) => {
    return {
      _id: _id,
      html: `<div   class=${styles.TMPTemplateStyle}><h1> ${_id} </h1> </div>`,
      name: `Template ${_id + 1}`,
    };
  }
);

const ManageCampaign = ({ isNew }) => {
  const userData = useSelector((state) => state.user.userData);

  const [currentState, setCurrentState] = React.useState(0);
  const [currentDataState, setCurrentDataState] = React.useState({
    template: 0,
    info: {
      campaignName: "",
      notes: "",
      subject: "",
      fromEmail: "",
      fromName: "",
      replyTo: "",
    },
    audience: {
      value: MANAGE_CAMPAIGN_DATA.steps[2].options[0].name,
      tags: [],
    },
    schedule: {
      value: MANAGE_CAMPAIGN_DATA.steps[3].options[0].name,
      time: null,
    },
  });

  console.log(currentDataState.schedule);

  const handleNext = () => {
    if(currentState==0){
      createNewCampaign(currentDataState.info)
    }
    setCurrentState(currentState + 1);
  };
  const handleBack = () => {
    setCurrentState(currentState - 1);
  };

  const handleCampaignInfoChange = (e) => {
    setCurrentDataState({
      ...currentDataState,
      info: {
        ...currentDataState.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAudienceChange = (e) => {
    setCurrentDataState({
      ...currentDataState,
      audience: {
        ...currentDataState.audience,
        value: e.target.value,
      },
    });
  };

  const handleTagsChange = (e, value) => {
    setCurrentDataState({
      ...currentDataState,
      audience: {
        ...currentDataState.audience,
        tags: [...value],
      },
    });
  };

  const handleScheduleChange = (e) => {
    setCurrentDataState({
      ...currentDataState,
      schedule: {
        ...currentDataState.schedule,
        value: e.target.value,
      },
    });
  };

  const handleScheduleTimeChange = (newTime) => {
    setCurrentDataState({
      ...currentDataState,
      schedule: {
        ...currentDataState.schedule,
        time: newTime,
      },
    });
  };

  const createNewCampaign = async (data) => {
    try {
      console.log("create campaign started with data",data)
      const response = await createCampaign(userData.accessToken,data);
      console.log(response);
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
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
        {currentState === 0 && (
          <ManageCampaignState1
            campaignInfo={currentDataState.info}
            handleCampaignInfoChange={handleCampaignInfoChange}
          />
        )}
        {currentState === 1 && (
          <ManageCampaignState2
            templates={tempTemplates}
            activeTemplate={currentDataState.template}
            setActiveTemplate={(template) => {
              console.log(template);
              setCurrentDataState({ ...currentDataState, template });
            }}
          />
        )}
        {currentState === 2 && (
          <ManageCampaignState3
            audience={currentDataState.audience}
            handleAudienceChange={handleAudienceChange}
            handleTagsChange={handleTagsChange}
          />
        )}
        {currentState === 3 && (
          <ManageCampaignState4
            schedule={currentDataState.schedule}
            hnadleScheduleChange={handleScheduleChange}
            handleScheduleTimeChange={handleScheduleTimeChange}
          />
        )}
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
