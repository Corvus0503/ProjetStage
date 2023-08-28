import React from "react";
import RechartCreator from "../charts/RechartCreator";
import { Bar, BarChart, Tooltip, XAxis, YAxis, Legend } from "recharts"; // Importez Legend depuis recharts


//const palette = ['#ff5223', '#217009', '#2181c2'];
const SimpleBarChart = ({ height, width }) => {
  const data = [
    { id: 0, value: 3, label: 'Refusé' },
    { id: 1, value: 2, label: 'Validé' },
    { id: 2, value: 5, label: 'En Attente' },
  ];

  const divisionData = [
    { division: 'Division VISA', refusé: 3, validé: 2, enAttente: 5 },
    { division: 'Division SOLDE', refusé: 4, validé: 1, enAttente: 6 },
    { division: 'Division PENSION', refusé: 2, validé: 3, enAttente: 4 },
    { division: 'Division BAG', refusé: 5, validé: 3, enAttente: 9 },

  ];

  return (
    <RechartCreator height={height} width={width}>
      <BarChart
        width={100}
        height={400}
        data={divisionData} // Utilisez la nouvelle série de données avec les divisions
        margin={{ top: 5, right: 30, left: 20, bottom: 50 }} // Ajustez la marge du bas pour faire de la place à la légende
      >
        <XAxis dataKey="division" /> {/* Utilisez dataKey "division" pour afficher les noms des divisions */}
        <YAxis />
        <Tooltip />
        <Legend /> {/* Activez la légende pour afficher les états (Refusé, Validé, En Attente) */}
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Bar dataKey="refusé" fill="#ff5223" /> {/* Utilisez dataKey "refusé" pour les données refusées */}
        <Bar dataKey="validé" fill="#217009" /> {/* Utilisez dataKey "validé" pour les données validées */}
        <Bar dataKey="enAttente" fill="#2181c2" /> {/* Utilisez dataKey "enAttente" pour les données en attente */}
      </BarChart>
    </RechartCreator>
  );
};

export default SimpleBarChart;
