/* eslint-disable react/prop-types */
import {  } from "../../utils/firebase";
import { useEffect, useState } from "react";
import {getPieChartCollection} from "../../utils/firebase/index"
import { Doughnut } from "react-chartjs-2";
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
  // totalVisits = {
  //   dextop: 300,
  //   mobile: 300,
  //   tablet: 200,
  //   unknown: 100,
  // },
  graphData,
})

 {

  const [totalVisits, setTotalVisits] = useState([])



    const pieData = {
    labels: ["Mobile", "Desktop", "Unknown", "Tablet"],
    datasets: [
      {
        label: "Number of visitors",
        data: totalVisits.map((eachVisitor)=> eachVisitor.visitors),
        backgroundColor: ["#E6A960", "#47A8BD", "#305C45", "#EDF7D2"],
        borderColor: ["transparent", "transparent"],
        borderWidth: 1,
      },
    ],
  };


  useEffect(()=>{
    const fetchPieChart = async()=>{
      try{
        const piechartData = await getPieChartCollection();
        setTotalVisits(piechartData);
      }catch(error){
        console.log(error);
      }
    }

    fetchPieChart()
  },[])


  return (
    <div className="">
      <Doughnut
        data={pieData}
        className="w-[300px] max-w-[300px] h-[300px] max-h-[300px]"
      />
    </div>
  );
}
