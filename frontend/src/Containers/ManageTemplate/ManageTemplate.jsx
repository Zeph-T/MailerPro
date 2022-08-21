import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import styles from "./ManageTemplate.module.css";
import { MANAGE_TEMPLATE_DATA } from "../../Utils/staticData";
import StyledInput from "../SignInUp/Helpers/StyledMUIInput";
import { ManageTemplateHTMLEditor } from "../../Components/ManageTemplate";

const ManageTemplate = ({ isNew }) => {
  const [currentDataState, setCurrentDataState] = React.useState({
    name: "",
    html: {
      textEditor: "",
      dragDrop: "",
      dragDropDesign: "",
      type: "textEditor",
    },
  });

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
      />
    </div>
  );
};

export default ManageTemplate;
