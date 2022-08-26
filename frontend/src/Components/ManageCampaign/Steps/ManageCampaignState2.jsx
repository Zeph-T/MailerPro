import React from "react";
import styles from "./ManageCampaignState2.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";
import { StyledMUISelect } from "../../General/Helpers";

function ManageCampaignState2({
  templates,
  activeTemplate = 0,
  setActiveTemplate,
  isSMS,
}) {
  return (
    <div className={styles.Wrapper}>
      <h2>{MANAGE_CAMPAIGN_DATA.steps[1].chooseTemplate}</h2>
      <StyledMUISelect
        value={activeTemplate}
        options={templates.map((template) => ({
          value: template._id,
          label: template.name,
        }))}
        onChange={(e) => {
          setActiveTemplate(e.target.value);
        }}
        style={{ maxWidth: "30rem" }}
      />

      {isSMS ? (
        <pre
          className={styles.TemplatePreviewWrapper + " " + styles.SMS}
          dangerouslySetInnerHTML={{
            __html: templates.filter((item) => item._id === activeTemplate)[0]
              ?.content,
          }}
        />
      ) : (
        <div
          className={styles.TemplatePreviewWrapper}
          dangerouslySetInnerHTML={{
            __html: templates.filter((item) => item._id === activeTemplate)[0]
              ?.content,
          }}
        />
      )}
    </div>
  );
}

export default ManageCampaignState2;
// templates[activeTemplate].html
