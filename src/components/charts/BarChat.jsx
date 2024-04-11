import React, { useLayoutEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

const BarChat = ({
  graphData = [
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1300 },
    { date: "25", ammount: 1500 },
    { date: "25", ammount: 100 },
    { date: "25", ammount: 6000 },
    { date: "25", ammount: 1900 },
    { date: "25", ammount: 1100 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 0 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
    { date: "25", ammount: 1000 },
  ],
}) => {
  return (
    <Bar
      className="max-w-2xl"
      data={{
        labels: graphData.map((user) => user.date),
        datasets: [
          {
            label: "Sales",
            data: graphData.map((user) => user.ammount),
            backgroundColor: "#E6A960",

            borderRadius: 20,
            barPercentage: 0.25,
            categoryPercentage: 0.25,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default BarChat;
