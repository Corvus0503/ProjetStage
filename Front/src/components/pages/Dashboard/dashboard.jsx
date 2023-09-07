import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { Card } from "@mui/material";
import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import axios from "axios"

const Dashboard = ({user}) => {
    const theme = useTheme();
    const height = "200px"
    const [previsionList, setPrevisionList] = useState()

    const chargeListValidation = async()=>{
      try {
          const response=await axios.get('http://localhost:8080/prevision')
          setPrevisionList(response.data)
      } catch (error) {
          console.error(error);
      }
  }
  

  useEffect(() => {
    chargeListValidation()
}, []);

  console.log("prevision : ",previsionList)

  
    const option = {
      grid: { top: '10%', bottom: '10%', right: '5%' },
      legend: { show: false },
      color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
      barGap: 0,
      barMaxWidth: '64px',
      dataset: {
        source: previsionList,
      },
      xAxis: {
        type: 'category',
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 13,
          fontFamily: 'roboto',
          
        },
      },
      yAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        
        axisLabel: {
          fontSize: 13,
          fontFamily: 'roboto',
          
        },
      },
      series: [{ type: 'line' }],
    };
    
  
    return (
      <div>
        <h1>Historique des previsions</h1>
        {previsionList && <ReactEcharts style={{ height: height }} option={{ ...option }} />}
        
      </div>
    );
}

export default Dashboard