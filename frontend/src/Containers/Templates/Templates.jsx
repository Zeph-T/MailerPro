import React from "react";

import styles from "./Templates.module.css";
import Header from "./../../Components/Header/index";
import { TEMPLATES_PAGE_DATA } from "./../../Utils/staticData";

function Templates() {
  return (
    <div className={styles.container}>
      <Header title={TEMPLATES_PAGE_DATA.title} subTitle={"hehe"} />
    </div>
  );
}

export default Templates;
