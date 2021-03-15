import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = ({ label, data1, data2, backgroundColor, borderColor }) => {
  //console.log(data1, data2);
  const data = {
    labels: data1,
    datasets: [
      {
        label: label,
        data: data2,
        fill: false,
        //backgroundColor: "rgb(255, 99, 132)",
        backgroundColor,
        //borderColor: "rgba(255, 99, 132, 0.2)",
        borderColor,
      },
    ],
  };
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
