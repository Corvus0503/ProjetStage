import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

// Composant pour afficher la liste des articles dans une modal
const ArticleListModal = ({isModalOpen, closeModal,user}) => {
  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [besoinList, setBesoinList] = useState([]);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
  const matricule=user.user.user.user[0].MATRICULE;

  // Utilisation de useEffect pour charger la liste des articles lorsque l'idCat change
  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/besoinDetail/${idCat}`);
        setBesoinList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (matricule) {
      fetchArticleList();
    }
  }, [matricule]);

  // Fonction pour gérer le changement de page
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Fonction pour gérer le changement du nombre de lignes par page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Rendu du composant de la modal
  return (
    <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>Detail des Besoin</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"> Matricule </TableCell>
              <TableCell align="center"> Nom   </TableCell>
              <TableCell align="center"> Division </TableCell>
              <TableCell align="center"> Article </TableCell>
              <TableCell align="center"> Quantité </TableCell>
              <TableCell align="center"> Unité </TableCell>
              <TableCell align="center"> Date </TableCell>
              <TableCell align="center"> Etat </TableCell>
              <TableCell align="center">Opération</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {besoinList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((besoinList) => (
                <TableRow key={besoinList.NUM_BESOIN}>
                <TableCell align="center">{besoinList.MATRICULE}</TableCell>
                <TableCell align="center">{besoinList.NOM_AG + besoinList.PRENOM_AG}</TableCell>
                <TableCell align="center">{besoinList.LABEL_DIVISION}</TableCell>
                <TableCell align="center">{besoinList.DESIGNATION_ART}</TableCell>
                <TableCell align="center">{besoinList.QUANTITE}</TableCell>
                <TableCell align="center">{besoinList.UNITE}</TableCell>
                <TableCell align="center">{besoinList.DATE_BESOIN}</TableCell>
                <TableCell align="center">
                                <Button> <InfoIcon color="warning"/> </Button>
                                <Button> <CheckCircleOutlineIcon color="success"/> </Button>
                                <Button> <CancelIcon color="danger"/> </Button>
                            </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={besoinList.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="warning">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleListModal;
