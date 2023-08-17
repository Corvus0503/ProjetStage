import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Table, TableBody,styled, TableCell, TableHead, TablePagination, TableRow, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';


const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
// Composant pour afficher la liste des articles dans une modal
const ServiceListModal = ({ isModalOpen, closeModal, onRowSelect, idCat }) => {
  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ServiceList, setServiceList] = useState([]);

  // Utilisation de useEffect pour charger la liste des articles lorsque l'idCat change
  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/service');
      setServiceList(response.data);
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
      <DialogTitle>Liste des Services</DialogTitle>
      <DialogContent>
        <StyledTable >
          <TableHead>
            <TableRow>
              <TableCell align="center"> Num Service </TableCell>
              <TableCell align="center"> Designation </TableCell>
              <TableCell align="center" >Villes </TableCell>
              <TableCell align="center"> Adresse </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ServiceList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(list => (
                <TableRow key={list.CODE_SER}>
                  <TableCell align="center">{list.CODE_SER}</TableCell>
                  <TableCell align="center">{list.LIBELLE}</TableCell>
                  <TableCell align="center">{list.VILLE}</TableCell>
                  <TableCell align="center">{list.ADRESSE}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        onRowSelect(list); // Appel de la fonction lorsqu'un article est sélectionné
                        closeModal(); // Fermeture de la modal
                      }}
                    >
                      <DriveFileMoveIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={ServiceList.length}
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

export default ServiceListModal;