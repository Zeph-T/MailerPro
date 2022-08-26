import React, { useEffect, useRef, useState } from "react";
import { MANAGE_TEMPLATE_DATA } from "../../Utils/staticData";

import styles from "./ManageTemplateHTMLEditor.module.css";
import { StyledMUIButton, StyledMUITextField } from "../General/Helpers";

function ManageTemplateSMSEditor({ templateData, setData, saveTemplate }) {
  return (
    <div className={styles.Wrapper}>
      <StyledMUITextField
        name={MANAGE_TEMPLATE_DATA.content}
        label={MANAGE_TEMPLATE_DATA.content}
        placeholder={MANAGE_TEMPLATE_DATA.addContent}
        style={{ maxWidth: "40rem" }}
        multiline
        value={templateData.content}
        onChange={(e) => {
          setData("content", e.target.value);
        }}
      />

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

export default ManageTemplateSMSEditor;
