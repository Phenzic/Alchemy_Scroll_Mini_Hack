"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {getUserOrders, totalUsers} from "../../utils/firebase/index"



const BarChart = () => {

  const [months, setMonths] = useState([[],[],[],[4,5],[],[],[],[],[],[],[],[]])
  const [loadingData,setLoadingData] = useState(false);
  
  useEffect(function(){
    console.log("Loaded")
    const getOrderTest = async function(){
      const orders = await getUserOrders()
      console.log(orders)
    }
    getOrderTest()
  },[])
  

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false, // Hide the toolbar, including the hamburger menu
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    plotOptions: {
      bar: {
        columnWidth: "10%", // Adjust the width of the bars (10% makes them thinner)
        borderRadius: 4, // Add a slight border radius to the bars
      },
    },
    colors: [
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
      "#E6A960",
    ], // Set colors for the bars
    grid: {
      show: false, // Hide the chart's grid lines and baseline
    },
    dataLabels: {
      enabled: false, // Hide data labels on top of the bars
    },
  };

  const series = [
    {
      name: "Amount",
      data: months.map(function(_,index){return months[index]?.length}),
    },
  ];

  return (
    <React.Fragment>
      {
        loadingData?<p>Loading the Admin BarChart</p>:
      <ReactApexChart
      className={"w-full"}
      options={options}
      series={series}
      type="bar"
      height={350}
      />
      }
    </React.Fragment>
  );
};

export default BarChart;
