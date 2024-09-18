import {getPieChartCollection, updateMobile, updateDesktop, updateTablet, updateUnknown} from "../utils/firebase/index";

export const mobilePieChart = async ()=>{
    const pieChartData = await getPieChartCollection();
    const findMobile = pieChartData.find((eachData)=> eachData.device =="mobile");
    if(findMobile){
      const update = findMobile.visitors+1;
      updateMobile(update);
    }
  }

export const desktopPieChart = async ()=>{
    const pieChartData = await getPieChartCollection();
    const findMobile = pieChartData.find((eachData)=> eachData.device =="desktop");
    if(findMobile){
      const update = findMobile.visitors+1;
      updateDesktop(update);
    }
  }

export const tabletPieChart = async ()=>{
    const pieChartData = await getPieChartCollection();
    const findMobile = pieChartData.find((eachData)=> eachData.device =="tablet");
    if(findMobile){
      const update = findMobile.visitors+1;
      updateTablet(update);
    }
  }

export const unknownPieChart = async ()=>{
    const pieChartData = await getPieChartCollection();
    const findMobile = pieChartData.find((eachData)=> eachData.device =="unknown");
    if(findMobile){
      const update = findMobile.visitors+1;
      updateUnknown(update);
    }
  }


