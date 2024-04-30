"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {totalUsers} from "../../utils/firebase/index"



const BarChart = () => {

  const [months, setMonths] = useState([[],[],[],[4,5],[],[],[],[],[],[],[],[]])
  const [loadingData,setLoadingData] = useState(false);
  
  useEffect(function(){
    setLoadingData(true)
    const all_users = async function(){
      const data = await totalUsers()
      const test = data.map(function(each){
        const timeStampInSeconds = each.createdAt.seconds
        const date = new Date(timeStampInSeconds*1000)
        const month = date.getMonth( ) 
        return (month);       
      })
      // console.log(test);
      // console.log(months[test[0]])
      // setMonths(function(prev){
      //   return(
      //     [...prev,months[test[0]]?.concat(test)]
      //   )
      // })
      setLoadingData(false)
      
    }
    all_users();
    
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
