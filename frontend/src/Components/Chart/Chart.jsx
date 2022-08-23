import React from 'react'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


export default function LineChart({chartData}) {
  return (
    <div>
      <Chart
        type='line'
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Subscriber data for the past week"
            },
            layout: {
              padding: -2
            },
            legend: {
              display: true,
              position: 'top',
           }
          },
          // clip: {left: 5, top: false, right: -2, bottom: 0}
        }}
      />
    </div>
  );
};

