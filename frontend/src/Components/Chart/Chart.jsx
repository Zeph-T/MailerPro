import React from "react";
import styles from "./Chart.module.css";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

export default function LineChart({ chartData }) {
  return (
    <div className={styles.Wrapper}>
      <Chart
        type="line"
        style={{ width: "100%", height: "100%" }}
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              ticks: {
                font: {
                  size: 12,
                  family: '"Poppins", sans-serif',
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 12,
                  family: '"Poppins", sans-serif',
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Subscriber data for the past week",
              font: {
                family: '"Poppins", sans-serif',
                size: 20,
              },
            },
            layout: {
              padding: -2,
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                font: {
                  family: '"Poppins", sans-serif',
                },
              },
            },
            tooltip: {
              bodyFont: {
                family: '"Poppins", sans-serif', // Add your font here to change the font of your tooltip body
              },
              titleFont: {
                family: '"Poppins", sans-serif', // Add your font here to change the font of your tooltip title
              },
            },
          },
          // clip: {left: 5, top: false, right: -2, bottom: 0}
        }}
      />
    </div>
  );
}
