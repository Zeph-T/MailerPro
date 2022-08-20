import React from "react";

import styles from "./Templates.module.css";
import Header from "./../../Components/Header/index";
import { TEMPLATES_PAGE_DATA } from "./../../Utils/staticData";
import CustomTabs from "../../Components/General";

function Templates() {
  const [currentTab, setCurrentTab] = React.useState(
    TEMPLATES_PAGE_DATA.tabs[0].value
  );

  return (
    <div className={styles.container}>
      <div className={styles.HeaderSec}>
        <Header
          title={TEMPLATES_PAGE_DATA.title}
          subTitle={"Create reusable templates"}
        />
        <CustomTabs
          tabsData={TEMPLATES_PAGE_DATA.tabs}
          currentTab={currentTab}
          handleClick={(val) => {
            setCurrentTab(val);
          }}
        />
      </div>
    </div>
  );
}

export default Templates;
