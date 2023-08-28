import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import ReactEcharts from "echarts-for-react";

const palette = ['rgb(255, 0, 0)', '#123545', 'rgb(25, 0, 255)'];
const DoughnutChart = ({ height, user }) => {
    const chartRef = useRef(null);

    const [nombreEnAttente, setNombreEnAttente] = useState(0);
    const [nombreRefus, setNombreRefus] = useState(0);
    const [nombreValider, setNombreValider] = useState(0);

   useEffect(() => {
    const userId = user[0].MATRICULE; // Assurez-vous que c'est le bon champ pour l'ID de l'utilisateur

    const fetchData = async () => {
      try {
        const responseEnAttente = await axios.get(`http://localhost:8080/besoinAttente/${userId}`);
        const responseRefus = await axios.get(`http://localhost:8080/besoinRefus/${userId}`);
        const responseValider = await axios.get(`http://localhost:8080/besoinValide/${userId}`);

        setNombreEnAttente(responseEnAttente.data[0].ATTENT);
        setNombreRefus(responseRefus.data[0].REFUS);
        setNombreValider(responseValider.data[0].VALIDE);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [user]);

    useEffect(() => {
      const handleResize = () => {
        if (chartRef.current) {
          const chartInstance = chartRef.current.getEchartsInstance();
          if (chartInstance) {
            chartInstance.resize(); // Redimensionner le graphique lorsque les dimensions changent
          }
        }
      };
    console.log(user)
      window.addEventListener("resize", handleResize);
  
      // Redimensionner le graphique une fois après le montage initial
      handleResize();
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const data = [
      { id: 0, value: nombreRefus, name: "Refusé", color: palette[0] },
      { id: 1, value: nombreValider, name: "Validé", color: palette[1] },
      { id: 2, value: nombreEnAttente, name: "En Attente", color: palette[2] },
    ];
  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: "circle",
      bottom: 0,
      textStyle: {
        color: palette,
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    series: [
      {
        name: "Traffic Rate",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: "center",
            textStyle: {
              color: palette,
              fontSize: 13,
              fontFamily: "roboto",
            },
            formatter: "{a}",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: 14,
              fontWeight: "normal",
            },
            formatter: "{b} \n{c} ({d}%)",
          },
        },
        labelLine: {
          normal: { show: false },
        },
        data: data.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: item.color }
          })),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts style={{ height: height }} option={option} />;
};

export default DoughnutChart;
