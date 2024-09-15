"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {getOrders} from "../../utils/firebase/index"

const BarChart = () => {  
  const [loadingData,setLoadingData] = useState(false);

  const [jan,setJan] = useState([])
  const [feb,setFeb] = useState([])
  const [march,setMarch] = useState([])
  const [april,setApril] = useState([])
  const [may,setMay] = useState([])
  const [june,setJune] = useState([])
  const [july,setJuly] = useState([])
  const [aug,setAug] = useState([])
  const [sept,setSept] = useState([])
  const [oct,setOct] = useState([])
  const [nov,setNov] = useState([])
  const [dec,setDec] = useState([])

  useEffect(function(){
    const getOrderTest = async function(){


      const orders = await getOrders()
      const orders_date = orders.map(function(eachOrder){
        const date = new Date(eachOrder.createdOn.seconds*1000).getMonth();
        return date
      })
      console.log(orders_date)
      orders_date.map(function(date){
        if(date===0){
          setJan(function(prev){
            return [...prev,date]
          })       
        }else if(date===1){
          setFeb(function(prev){
            return [...prev,date]
          })
        }else if(date===2){
          setMarch(function(prev){
            return [...prev,date]
          })
        }else if(date===3){
          setApril(function(prev){
            return [...prev,date]
          })
        }else if(date===4){
          setMay(function(prev){
            return [...prev,date]
          })
        }else if (date===5){
          setJune(function(prev){
            return [...prev,date]
          })
        }else if (date===6){
          setJuly(function(prev){
            return [...prev,date]
          })
        }else if (date===7){
          setAug(function(prev){
            return [...prev,date]
          })
        }else if (date===8){
          setSept(function(prev){
            return [...prev,date]
          })
        }else if (date===9){
          setOct(function(prev){
            return [...prev,date]
          })
        }else if (date===10){
          setNov(function(prev){
            return [...prev,date]
          })
        }else{
          setDec(function(prev){
            return [...prev,date]
          })
        }
      })
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
      data: [jan.length,feb.length,march.length,april.length,may.length,june.length,july.length,aug.length,sept.length,oct.length,nov.length,dec.length],
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
