import { format } from 'date-fns';

// Fonction pour formater une date ISO en 'yyyy-MM-dd'
export const formatISODateToYYYYMMDD = (isoDate) => {
  const formattedDate = format(new Date(isoDate), 'yyyy-MM-dd');
  return formattedDate;
};