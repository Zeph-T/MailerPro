import React, { useState, useInsertionEffect, useEffect } from "react";
import { Typography } from "@mui/material";
import { DASHBOARD_DATA } from "./../../Utils/staticData";
import Header from "../../Components/Header";
import Chart from "../../Components/Chart";
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
      console.log(DASHBOARD_DATA.subscriberData);
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
            label : "Unsubscriber count",
            data : unSubscriberData.map(item=>item.subscribers),
            fill : true,
            borderColor : "#ff0000",
            tension : 0.1
          }
        ],
      });
    };
    fetchData();
  }, [subscriberData]);
  return (
    <div>
      <Header
        title={
          DASHBOARD_DATA.RecentActivities
        }
        subTitle={DASHBOARD_DATA.RecentActivitiesSubText}
      />
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
