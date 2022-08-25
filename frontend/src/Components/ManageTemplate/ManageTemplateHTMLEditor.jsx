import React, { useEffect, useRef, useState } from "react";
import RichTextEditor from "react-rte";
import EmailEditor from "react-email-editor";

import { MANAGE_TEMPLATE_DATA } from "../../Utils/staticData";
import CustomTabs from "../General";

import styles from "./ManageTemplateHTMLEditor.module.css";
import { StyledMUIButton } from "../General/Helpers";

function ManageTemplateHTMLEditor({
  htmlData,
  setHTMLData,
  setIsSavedButtonClicked,
}) {
  const [value, setValue] = useState();
  const emailEditorRef = useRef(null);
  const [isDragNDropUsable, setIsDragNDropUsable] = useState(false);

  useEffect(() => {
    if (!htmlData) {
      setValue(RichTextEditor.createEmptyValue());
    } else {
      setValue(
        RichTextEditor.createValueFromString(htmlData.textEditor, "html")
      );
    }
  }, [htmlData]);

  const saveTemplate = () => {
    if (htmlData.type === "textEditor") {
      setHTMLData("textEditor", value.toString("html"));
    }
    if (htmlData.type === "dragDrop" && isDragNDropUsable === true) {
      emailEditorRef.current?.editor.exportHtml((data) => {
        const { design, html } = data;
        setHTMLData("dragDrop", { design, html });
      });
    }
    setIsSavedButtonClicked(true);
  };

  const onLoad = () => {
    setIsDragNDropUsable(true);
    console.log(htmlData?.dragDrop?.html);
    if (htmlData?.dragDrop?.html) {
      emailEditorRef.current?.editor.loadDesign(htmlData.dragDrop.design || {});
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.UppperSec}>
        <h2>{MANAGE_TEMPLATE_DATA.design}</h2>
        <CustomTabs
          tabsData={MANAGE_TEMPLATE_DATA.tabs}
          currentTab={htmlData?.type}
          handleClick={(val) => {
            setHTMLData("type", val);
            if (val !== "dragDrop") {
              setIsDragNDropUsable(false);
            }
          }}
        />
      </div>
      {htmlData.type === "textEditor" && value && (
        <>
          <RichTextEditor
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </>
      )}
      {htmlData.type === "dragDrop" && (
        <>
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
        </>
      )}
      <div>
        <StyledMUIButton
          onClick={saveTemplate}
          color="buttonGreen"
          style={{
            minWidth: "16rem",
          }}
        >
          {MANAGE_TEMPLATE_DATA.save}
        </StyledMUIButton>
      </div>
    </div>
  );
}

export default ManageTemplateHTMLEditor;
