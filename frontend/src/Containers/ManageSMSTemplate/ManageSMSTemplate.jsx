import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../Utils/helper/notifyToast";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import styles from "./ManageSMSTemplate.module.css";
import { MANAGE_TEMPLATE_DATA } from "../../Utils/staticData";
import StyledInput from "../SignInUp/Helpers/StyledMUIInput";
import {
  createTemplate,
  getTemplate,
  updateTemplate,
} from "../../Services/template.service";
import ManageTemplateSMSEditor from "../../Components/ManageTemplate/ManageTemplateSMSEditor";

const ManageSMSTemplate = ({ isNew }) => {
  const navigate = useNavigate();

  const params = useParams();
  const userData = useSelector((state) => state.user?.userData);

  const [currentDataState, setCurrentDataState] = React.useState({
    name: "",
    content: "",
  });

  const setData = (type, data) => {
    setCurrentDataState({
      ...currentDataState,
      [type]: data,
    });
  };

  useEffect(() => {
    if (params.templateId) {
      (async () => {
        try {
          const { data } = await getTemplate(
            params.templateId,
            userData.accessToken
          );
          console.log(data);
          setCurrentDataState({
            name: data.data.name,
            content: data.data.content,
          });
        } catch (error) {
          notify(error.message, "error");
        }
      })();
    }
  }, [params.templateId, userData.accessToken]);

  const handleSave = async () => {
    console.log("called");
    try {
      if (currentDataState.name === "") {
        return notify("Please fill all the fields", "error");
      }
      console.log(currentDataState);
      if (params.templateId) {
        await updateTemplate(
          {
            ...currentDataState,
            _id: params.templateId,
          },
          userData.accessToken
        );
        return notify("Template updated successfully", "success");
      }
      const resp = await createTemplate(
        currentDataState,
        "SMS",
        userData.accessToken
      );
      console.log(resp);
      notify("Template created successfully", "success");
      return navigate(`/managesmstemplate/${resp.data.data._id}`);
    } catch (err) {
      console.log(err);
      return notify("Template creation failed", "error");
    }
  };

  useEffect(() => {
    console.log(currentDataState);
  }, [currentDataState]);

  return (
    <div className={styles.container}>
      <Header
        title={
          isNew
            ? MANAGE_TEMPLATE_DATA.createSMSTemplate
            : MANAGE_TEMPLATE_DATA.manageSMSTemplate
        }
        withBackButton
        link="/templates"
      />
      <div className={styles.UpperSec}>
        <StyledInput
          {...MANAGE_TEMPLATE_DATA.inputs.name}
          onChange={(e) =>
            setCurrentDataState({ ...currentDataState, name: e.target.value })
          }
          value={currentDataState.name}
        />
      </div>
      <ManageTemplateSMSEditor
        templateData={currentDataState}
        setData={setData}
        saveTemplate={handleSave}
      />
    </div>
  );
};

export default ManageSMSTemplate;
