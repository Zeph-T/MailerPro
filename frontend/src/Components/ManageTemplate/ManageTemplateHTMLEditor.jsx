import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";

import { MANAGE_TEMPLATE_DATA } from "../../Utils/staticData";
import CustomTabs from "../General";

import styles from "./ManageTemplateHTMLEditor.module.css";

function ManageTemplateHTMLEditor({ htmlData, setHTMLData }) {
  const [value, setValue] = useState();

  useEffect(() => {
    // set the state value using the package available method
    setValue(RichTextEditor.createEmptyValue());
  }, []);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.UppperSec}>
        <h2>{MANAGE_TEMPLATE_DATA.design}</h2>
        <CustomTabs
          tabsData={MANAGE_TEMPLATE_DATA.tabs}
          currentTab={htmlData?.type}
          handleClick={(val) => {
            setHTMLData("type", val);
          }}
        />
      </div>
      {htmlData.type === "textEditor" && value && (
        <>
          <RichTextEditor
            value={value}
            onChange={(val) => {
              setValue(val);
              setHTMLData("textEditor", val.toString("html"));
            }}
          />
        </>
      )}
      {htmlData.type === "dragDrop" && <></>}
    </div>
  );
}

export default ManageTemplateHTMLEditor;
