import * as React from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import axios from 'axios'; // Importez Axios en minuscules

const palette = ['#ff5223', '#217009', '#2181c2'];

export default function PieActiveArc() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEnAttente = await axios.get('http://localhost:8080/besoinAttente');
        const responseRefus = await axios.get('http://localhost:8080/besoinRefus');
        const responseValider = await axios.get('http://localhost:8080/besoinValide');

        const data = [
          { id: 0, value: responseRefus.data[0].REFUS, label: 'Refusé' },
          { id: 1, value: responseValider.data[0].VALIDE, label: 'Validé' },
          { id: 2, value: responseEnAttente.data[0].ATTENT, label: 'En Attente' },
        ];

        setData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart
      colors={palette}
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      sx={{
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
        },
        legend: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        },
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      height={300}
      options={{
        animation: {
          enabled: true, // Activer les animations
          duration: 1000, // Durée de l'animation en millisecondes
          easing: 'easeInOutQuad', // Type d'interpolation pour l'animation
        },
      }}
    />
  );
}
