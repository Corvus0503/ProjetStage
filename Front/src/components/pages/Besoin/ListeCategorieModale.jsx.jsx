import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

// Composant de la modal pour afficher la liste des catégories
const CategorieListModal = ({ isModalCatOpen, closeCatModal, onRowCatSelect }) => {
  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [categorieList, setCategorieList] = useState([]);

  // Utilisation de useEffect pour effectuer une requête au chargement de la modal
  useEffect(() => {
    const fetchCategorieList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categorie");
        setCategorieList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategorieList();
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
    <Dialog open={isModalCatOpen} onClose={closeCatModal} fullWidth maxWidth="md">
      <DialogTitle>Liste des Catégories</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Catégorie</TableCell>
              <TableCell align="center">Opération</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorieList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(cat => (
                <TableRow key={cat.ID_CAT}>
                  <TableCell align="center">{cat.LABEL_CAT}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => {
                      onRowCatSelect(cat);
                      closeCatModal();
                    }}>
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
          count={categorieList.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCatModal} color="warning">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategorieListModal;
