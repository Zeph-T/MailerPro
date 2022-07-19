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
        // slidesPerView={5.3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={false}
        style={{ margin: "0 auto" }}
        setWrapperSize={true}
      >
        {templates.map((template, index) => (
          <SwiperSlide key={index}>
            <img
              src={template.img}
              alt="template"
              className={
                styles.Image +
                " " +
                (activeTemplate === template._id ? styles.ActiveImage : "")
              }
              onClick={() => setActiveTemplate(template._id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.TemplatePreviewWrapper}>
        <img
          src={
            templates.find((template) => template._id === activeTemplate).img
          }
          alt="template"
          className={styles.TemplatePreview}
        />
      </div>
    </div>
  );
}

export default ManageCampaignState2;
