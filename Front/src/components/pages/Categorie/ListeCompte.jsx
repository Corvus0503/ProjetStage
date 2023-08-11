import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';


// Composant pour afficher la liste des articles dans une modal
const CompteListModal = ({ isModalOpen, closeModal, onRowSelect, idCat }) => {
  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [compteList, setCompteList] = useState([]);

  // Utilisation de useEffect pour charger la liste des articles lorsque l'idCat change
  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/compte');
      setCompteList(response.data);
      console.log("data loaded");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    chargerListAdmin();
  }, []);

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
      <DialogTitle>Liste des Articles</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Num compte</TableCell>
              <TableCell align="center">Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compteList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(article => (
                <TableRow key={article.NUM_CMPT}>
                  <TableCell align="center">{article.NUM_CMPT}</TableCell>
                  <TableCell align="center">{article.DESIGNATION_CMPT}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        onRowSelect(article); // Appel de la fonction lorsqu'un article est sélectionné
                        closeModal(); // Fermeture de la modal
                      }}
                    >
                      <DriveFileMoveIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={compteList.length}
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

export default CompteListModal;
