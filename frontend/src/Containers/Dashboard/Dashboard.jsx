import React, { useState, useInsertionEffect, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { DASHBOARD_DATA } from "./../../Utils/staticData";
import Header from "../../Components/Header";
import Chart from "../../Components/Chart";
import StyledMUIButton from "./../../Components/General/Helpers/StyledMUIButton";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [subscriberData, setSubscriberData] = useState([]);
  const [unSubscriberData, setunSubscriberData] = useState([]);
  const [chartdata, setChartData] = useState({});
  const [totalSubscribers, setTotalSubscribers] = useState(23000);
  const [unsubscribed, setUnsubscribed] = useState(1544);
  const [inactive, setInactive] = useState(10245);
  useEffect(() => {
    const fetchData = () => {
      //fetch subscriber data from backend
      //for now um using local data imported from utils
      setSubscriberData(DASHBOARD_DATA.subscriberData);
      setunSubscriberData(DASHBOARD_DATA.unSubscriberData);
      setChartData({
        labels: subscriberData.map((item) => item.date),
        datasets: [
          {
            label: "Subscriber count",
            data: subscriberData.map((item) => item.subscribers),
            fill: true,
            borderColor: "#0077EB",
            backgroundColor: "rgba(56, 120, 255, 0.2) ",
            tension: 0.1,
          },
          {
            label: "Unsubscriber count",
            data: unSubscriberData.map((item) => item.subscribers),
            fill: true,
            borderColor: "#ff0000",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            tension: 0.1,
          },
        ],
      });
    };
    fetchData();
  }, [subscriberData]);
  return (
    <div>
      <Header
        // title={DASHBOARD_DATA.RecentActivities}
        subTitle={DASHBOARD_DATA.MailerPro}
        subTitleStyles={{
          fontSize: "1.65rem",
          marginBottom: "1rem",
        }}
      />
      <Header
        title={DASHBOARD_DATA.RecentActivities}
        subTitle={DASHBOARD_DATA.RecentActivitiesSubText}
      />
      <AccordianComponent />
      {Object.keys(chartdata).length > 0 && <Chart chartData={chartdata} />}
      <div
        style={{
          display: "flex",
          margin: "4rem",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" className={styles.bottomText}>
          Total Subscribers:{" "}
          <div className={styles.total}>{totalSubscribers}</div>{" "}
        </Typography>
        <Typography variant="h4" className={styles.bottomText}>
          Unsubscribed Contacts:{" "}
          <div className={styles.unsubscribed}>{unsubscribed}</div>{" "}
        </Typography>
        <Typography variant="h4" className={styles.bottomText}>
          Inactive Contacts: <div className={styles.inactive}>{inactive}</div>
        </Typography>
      </div>
    </div>
  );
}

export default Dashboard;

const AccordianComponent = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{
          boxShadow: "none",
          marginTop: "2rem",
        }}
      >
        <AccordionSummary
          expandIcon={<></>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            padding: "0",
          }}
        >
          <StyledMUIButton color="buttonBlack">Get Started</StyledMUIButton>
          <Typography
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              paddingLeft: "2rem",
            }}
          >
            Learn more about MailerPro and all the functionalities it offers
            from our video
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            padding: 0,
          }}
        >
          <iframe
            width="1120"
            height="630"
            src="https://www.youtube.com/embed/bszL75YJJfU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{
              margin: "2rem auto",
              display: "block",
              borderRadius: "1rem",
            }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
