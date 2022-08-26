import React, { useEffect } from "react";
import Header from "../../Components/Header";
import ManageCampaignState from "./../../Components/ManageCampaign/ManageCampaignState";
import styles from "./ManageCampaign.module.css";
import { MANAGE_CAMPAIGN_DATA } from "./../../Utils/staticData";
import {
  createCampaign,
  getCampaignById,
  updateCampaign,
} from "../../Services/campaign.service";
import { fetchAllTemplates } from "../../Services/template.service";
import notify from "./../../Utils/helper/notifyToast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ManageCampaignStepsWrapper,
  ManageCampaignStepsPagination,
  ManageCampaignState1,
  ManageCampaignState2,
  ManageCampaignState3,
  ManageCampaignState4,
} from "./../../Components/ManageCampaign/Steps";

const ManageCampaign = ({ isNew, isSMS }) => {
  const params = useParams();
  let navigate = useNavigate();
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
    status: "Draft",
    audience: {
      audienceType: MANAGE_CAMPAIGN_DATA.steps[2].options[0].name,
      tags: [],
    },
    schedule: {
      value: MANAGE_CAMPAIGN_DATA.steps[3].options[1].name,
      time: null,
    },
    allTemplates: [],
  });
  console.log(currentDataState);
  useEffect(() => {
    fetchCampaignData();
  }, [params.id]);

  // useEffect(() => {
  //   async function fetchTemplates() {
  //     try {
  //     } catch (err) {
  //       console.log(err);
  //       notify("Internal Server Error while fetching templates", "error");
  //     }
  //   }

  //   fetchTemplates();
  //   console.log("useEffect ran...");
  // }, []);

  const fetchCampaignData = async () => {
    if (!isNew) {
      try {
        const response = await getCampaignById(
          userData.accessToken,
          params.id,
          isSMS
        );
        const templates = await fetchAllTemplates(
          isSMS ? "SMS" : "EMAIL",
          userData.accessToken
        );

        console.log("response", response);
        setCurrentDataState({
          ...currentDataState,
          template: response.data.template,
          info: {
            campaignName: response.data.name,
            notes: response.data.note,
            subject: response.data.Subject,
            fromEmail: response.data.senderMailAddress,
            fromName: response.data.SenderName,
            replyTo: response.data.ReplyMail,
          },
          status: response.data.status,
          audience: response.data.targetAudience,
          schedule: {
            value: response.data.isMarkedForImmediateSend
              ? "immediately"
              : "later",
            time: response.data.scheduledTime,
          },
          allTemplates: templates.data.data.templates,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(currentDataState.schedule);

  const handleNext = (e) => {
    e.preventDefault();
    if (currentState == 0 && isNew) {
      createNewCampaign(currentDataState.info);
    } else {
      if (
        currentState == 2 &&
        currentDataState.audience.audienceType === "TAGS" &&
        currentDataState.audience.tags.length > 0
      )
        updateExistingCampaign(currentDataState, params.id);
      else if (currentState == 1)
        updateExistingCampaign(currentDataState, params.id);
      else if(currentState == 3 && currentDataState.schedule.time !== null){
        updateExistingCampaign(currentDataState, params.id);
      } 
      else if (
        currentState == 2 &&
        currentDataState.audience.tags.length === 0 &&
        currentDataState.audience.audienceType === "TAGS"
      )
        return notify("Tags array is empty");
    }
    setCurrentState(currentState + 1);
  };
  const handleBack = () => {
    setCurrentState(currentState - 1);
  };

  const handleSave = () => {
    notify("Campaign Updated Successfully!");
    updateExistingCampaign(currentDataState, params.id);
    navigate("/campaign");
  };

  const handleCampaignStatusChange = (e) => {
    console.log("handleCampaignStatusChange Running", e.target.value);
    setCurrentDataState({
      ...currentDataState,
      status: e.target.value === "later" ? "Scheduled" : "Running",
    });
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
    handleCampaignStatusChange(e);
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
      const response = await createCampaign(userData.accessToken, data, isSMS);
      console.log("create campaign response from api", response);
      navigate(
        isSMS
          ? `/managesmscampaign/${response.data._id}`
          : `/managecampaign/${response.data._id}`
      );
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
  };

  const updateExistingCampaign = async (data, id) => {
    try {
      console.log("update campaign started with data", data);
      const response = await updateCampaign(
        userData.accessToken,
        data,
        id,
        isSMS
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleNext}>
      <Header
        title={
          isNew
            ? MANAGE_CAMPAIGN_DATA.createCampaign
            : MANAGE_CAMPAIGN_DATA.manageCampaign
        }
        withBackButton
        link="/campaign"
      />
      <ManageCampaignState currentState={currentState} />
      <ManageCampaignStepsWrapper>
        {currentState === 0 && (
          <ManageCampaignState1
            campaignInfo={currentDataState.info}
            handleCampaignInfoChange={handleCampaignInfoChange}
            isSMS={isSMS}
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
            isSMS={isSMS}
          />
        )}
        {currentState === 2 && (
          <ManageCampaignState3
            audience={currentDataState.audience}
            handleAudienceChange={handleAudienceChange}
            handleTagsChange={handleTagsChange}
            userData={userData}
            isSMS={isSMS}
          />
        )}
        {currentState === 3 && (
          <ManageCampaignState4
            schedule={currentDataState.schedule}
            handleScheduleChange={handleScheduleChange}
            handleScheduleTimeChange={handleScheduleTimeChange}
            handleCampaignStatusChange={handleCampaignStatusChange}
            isSMS={isSMS}
          />
        )}
        <ManageCampaignStepsPagination
          currentState={currentState}
          totalStates={4}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSave={handleSave}
        />
      </ManageCampaignStepsWrapper>
    </form>
  );
};

export default ManageCampaign;
