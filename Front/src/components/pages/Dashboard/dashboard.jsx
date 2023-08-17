import React, { useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { Card } from "@mui/material";
import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';


const Dashboard = ({user}) => {
    const theme = useTheme();
    const height = "200px"

    const option = {
      grid: { top: '10%', bottom: '10%', right: '5%' },
      legend: { show: false },
      color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
      barGap: 0,
      barMaxWidth: '64px',
      dataset: {
        source: [
          ['Month', 'Website', 'App'],
          ['Jan', 2200, 1200],
          ['Feb', 800, 500],
          ['Mar', 700, 1350],
          ['Apr', 1500, 1250],
          ['May', 2450, 450],
          ['June', 1700, 1250],
        ],
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
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }],
    };
  
    return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
}

export default Dashboard