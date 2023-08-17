import * as React from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';

const palette = ['#dc3545', 'rgba(9, 182, 109, 1)', '#ffc107'];

const data = [
  { id: 0, value: 3, label: 'Refusé' },
  { id: 1, value: 2, label: 'Validé' },
  { id: 2, value: 5, label: 'En Attente' },
];

export default function PieActiveArc() {
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
