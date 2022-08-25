import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./ManageCampaignState2.module.css";
import { MANAGE_CAMPAIGN_DATA } from "../../../Utils/staticData";

function ManageCampaignState2({
  templates,
  activeTemplate = 0,
  setActiveTemplate,
}) {
  return (
    <div className={styles.Wrapper}>
      <h2>{MANAGE_CAMPAIGN_DATA.steps[1].chooseTemplate}</h2>
      <Swiper
        spaceBetween={10}
        width={250}
        autoplay={false}
        style={{ margin: "0 auto" }}
        setWrapperSize={true}
      >
        {templates.map((template, index) => (
          <SwiperSlide key={index}>
            <div
              className={
                styles.NameComp +
                " " +
                (activeTemplate === template._id ? styles.ActiveNameComp : "")
              }
              onClick={() => setActiveTemplate(template._id)}
            >
              <span className={styles.NameCompText}>{template.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={styles.TemplatePreviewWrapper}
        dangerouslySetInnerHTML={{
          __html: templates.filter((item) => item._id === activeTemplate)[0]
            ?.content,
        }}
      />
    </div>
  );
}

export default ManageCampaignState2;
// templates[activeTemplate].html
