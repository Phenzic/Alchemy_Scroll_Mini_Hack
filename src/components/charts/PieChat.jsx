import React, { useLayoutEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
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

export function PieChat({
  totalVisits = {
    dextop: 3000,
    mobile: 4500,
    tablet: 10000,
    unknown: 89,
  },
  graphData,
}) {
  const pieData = {
    labels: ["Dextop", "Mobile", "Tablet", "Unknown"],
    datasets: [
      {
        label: "Number of visitors",
        data: [
          totalVisits.dextop,
          totalVisits.mobile,
          totalVisits.tablet,
          totalVisits.unknown,
        ],
        backgroundColor: ["#E6A960", "#47A8BD", "#305C45", "#EDF7D2"],
        borderColor: ["transparent", "transparent"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="">
      <Doughnut
        data={pieData}
        className="w-[300px] max-w-[300px] h-[300px] max-h-[300px]"
      />
    </div>
  );
}
