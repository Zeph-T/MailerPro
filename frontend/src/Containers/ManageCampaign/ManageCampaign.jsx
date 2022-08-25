import React, { useEffect } from "react";
import Header from "../../Components/Header";
import ManageCampaignState from "./../../Components/ManageCampaign/ManageCampaignState";
import styles from "./ManageCampaign.module.css";
import { MANAGE_CAMPAIGN_DATA } from "./../../Utils/staticData";
import { createCampaign,updateCampaign } from "../../Services/campaign.service";
import {fetchAllTemplates} from "../../Services/template.service";
import notify from "./../../Utils/helper/notifyToast";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
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

const ManageCampaign = ({ isNew,isSMS }) => {

  useEffect( ()=>{
    async function fetchTemplates() {
      try {
        const templates = await fetchAllTemplates(isSMS?"SMS":"EMAIL",userData.accessToken)
        console.log("templates",templates.data.data.templates)
        setCurrentDataState({...currentDataState, allTemplates:templates.data.data.templates})
      } catch (err) {
        console.log(err);
        notify("Internal Server Error while fetching templates", "error");
      }
    }

    fetchTemplates();
    console.log("useEffect ran...");
  },[])
   
  const params = useParams();
  let navigate = useNavigate()
  const userData = useSelector((state) => state.user.userData);
  const [currentState, setCurrentState] = React.useState(0);
  const [currentDataState, setCurrentDataState] = React.useState({
    template: "63072778c3220d060871e274",
    info: {
      campaignName: "",
      notes: "",
      subject: "",
      fromEmail: "",
      fromName: "",
      replyTo: "",
    },
    status:"Draft",
    audience: {
      audienceType: MANAGE_CAMPAIGN_DATA.steps[2].options[0].name,
      tags: [],
    },
    schedule: {
      value: MANAGE_CAMPAIGN_DATA.steps[3].options[1].name,
      time: null,
    },
    allTemplates:[]
  });

  // console.log(currentDataState.schedule);

  const handleNext = () => {
    if(currentState==0){
      createNewCampaign(currentDataState.info)
    }else{
      updateExistingCampaign(currentDataState,params.id)
    }
    setCurrentState(currentState + 1);
  };
  const handleBack = () => {
    setCurrentState(currentState - 1);
  };

  const handleSave = () => {
    notify("Campaign Updated Successfully!")
    updateExistingCampaign(currentDataState,params.id)
    navigate("/campaigns")
  }

  const handleCampaignStatusChange = (e) =>{
    console.log("handleCampaignStatusChange Running",e.target.value)
    setCurrentDataState({
      ...currentDataState,
      status: e.target.value==='later'?'Scheduled':'Running'
    });
  }

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
        audienceType: e.target.value,
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
    handleCampaignStatusChange(e)
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
      // console.log("create campaign started with data",data)
      const response = await createCampaign(userData.accessToken,data);
      console.log("create campaign response from api",response);
      navigate(`/managecampaign/${response.data._id}`)
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
  };

  const updateExistingCampaign = async (data,id) => {
    try {
      console.log("update campaign started with data",data)
      const response = await updateCampaign(userData.accessToken,data,id);
      console.log(response);
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
  }


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
            templates={currentDataState.allTemplates}
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
            userData={userData}
          />
        )}
        {currentState === 3 && (
          <ManageCampaignState4
            schedule={currentDataState.schedule}
            handleScheduleChange={handleScheduleChange}
            handleScheduleTimeChange={handleScheduleTimeChange}
            handleCampaignStatusChange={handleCampaignStatusChange}
          />
        )}
        <ManageCampaignStepsPagination
          currentState={currentState}
          totalStates={4}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSave ={handleSave}
        />
      </ManageCampaignStepsWrapper>
    </div>
  );
};

export default ManageCampaign;
