import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import notify from "../../Utils/helper/notifyToast";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import styles from "./ManageTemplate.module.css";
import { MANAGE_TEMPLATE_DATA } from "../../Utils/staticData";
import StyledInput from "../SignInUp/Helpers/StyledMUIInput";
import {
  createTemplate,
  getTemplate,
  updateTemplate,
} from "../../Services/template.service";
import { ManageTemplateHTMLEditor } from "../../Components/ManageTemplate";

const ManageTemplate = ({ isNew }) => {
  const params = useParams();
  const userData = useSelector((state) => state.user?.userData);

  const [currentDataState, setCurrentDataState] = React.useState({
    name: "",
    html: {
      textEditor: "",
      dragDrop: {
        html: "",
        design: {},
      },
      type: "textEditor",
    },
  });

  const [isSavedButtonClicked, setIsSavedButtonClicked] = React.useState(false);

  const setHTMLData = (type, data) => {
    setCurrentDataState({
      ...currentDataState,
      html: {
        ...currentDataState.html,
        [type]: data,
      },
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
            html: {
              textEditor:
                data.data.editorType === "TextEditor" ? data.data.content : "",
              dragDrop: {
                html:
                  data.data.editorType !== "TextEditor"
                    ? data.data.content
                    : "",
                design:
                  data.data.editorType !== "TextEditor" ? data.data.design : {},
              },
              type:
                data.data.editorType === "TextEditor"
                  ? "textEditor"
                  : "dragDrop",
            },
          });
        } catch (error) {
          notify(error.message, "error");
        }
      })();
    }
  }, [params.templateId, userData.accessToken]);

  useEffect(() => {
    (async () => {
      try {
        if (isSavedButtonClicked) {
          let compiledData = {
            name: currentDataState.name,
            content:
              currentDataState.html.type === "textEditor"
                ? currentDataState.html.textEditor
                : currentDataState.html.dragDrop.html,
            editorType:
              currentDataState.html.type === "textEditor"
                ? "TextEditor"
                : "Drag&Drop",
            design:
              currentDataState.html.type !== "textEditor"
                ? currentDataState.html.dragDrop.design
                : {},
          };
          if (compiledData.name === "") {
            setIsSavedButtonClicked(false);
            return notify("Please fill all the fields", "error");
          }
          console.log(compiledData);
          if (params.templateId) {
            await updateTemplate(
              {
                ...compiledData,
                _id: params.templateId,
              },
              userData.accessToken
            );
            setIsSavedButtonClicked(false);
            return notify("Template updated successfully", "success");
          }
          await createTemplate(compiledData, "EMAIL", userData.accessToken);
          setIsSavedButtonClicked(false);
          return notify("Template created successfully", "success");
        }
      } catch (err) {
        return notify("Template creation failed", "error");
      }
    })();
  }, [
    isSavedButtonClicked,
    currentDataState,
    userData.accessToken,
    params.templateId,
  ]);

  useEffect(() => {
    console.log(currentDataState);
  }, [currentDataState]);

  return (
    <div className={styles.container}>
      <Header
        title={
          isNew
            ? MANAGE_TEMPLATE_DATA.createTemplate
            : MANAGE_TEMPLATE_DATA.manageTemplate
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
      <ManageTemplateHTMLEditor
        htmlData={currentDataState.html}
        setHTMLData={setHTMLData}
        setIsSavedButtonClicked={setIsSavedButtonClicked}
      />
    </div>
  );
};

export default ManageTemplate;
