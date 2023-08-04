// Import des bibliothèques et des composants nécessaires
import { IconButton, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

// StyledTable est une table personnalisée qui ajuste l'espacement entre les cellules du tableau
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

// categorieListModal est un composant de dialogue qui affiche une liste d'categories dans un tableau
// Il prend en paramètres les propriétés suivantes :
// - isModalOpen : un booléen pour afficher ou masquer le dialogue
// - closeModal : une fonction de rappel pour fermer le dialogue
// - onRowSelect : une fonction de rappel pour sélectionner une ligne du tableau
const CategorieListModal = ({ isModalCatOpen, closeCatModal, onRowCatSelect }) => {
  // State pour la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State pour stocker la liste des categories
  const [CategorieList, setCategorieList] = useState([]);

  // State pour stocker la ligne d'categorie sélectionnée
  const [selectedRow, setSelectedRow] = useState({
    ID_CAT:"",
    LABEL_CAT:""
  });

  // Gestionnaire de sélection de ligne
  const handleSelectCatRow = (row) => {
    onRowCatSelect(row); // Appeler la fonction de rappel onRowSelect pour passer les données de la ligne sélectionnée au composant parent
    console.log(row)
    closeCatModal(); // Fermer le dialogue après avoir sélectionné la ligne
  };

  // Fonction pour charger la liste des categories depuis l'API
  const chargerListAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categorie");
      setCategorieList(response.data);
      console.log("Données chargées");
    } catch (error) {
      console.error(error);
    }
  };

  // Utiliser useEffect pour charger la liste des categories lorsque le composant est monté
  useEffect(() => {
    chargerListAdmin();
  }, []);

  // Gestionnaires de pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    // Le composant de dialogue pour afficher la liste des categories
    <Dialog
      open={isModalCatOpen}
      onClose={closeCatModal}
      aria-labelledby="categorie-list-dialog"
      fullWidth
      maxWidth="md"
      sx={{
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Personnaliser les propriétés de l'ombre ici
      }}
    >
      <DialogTitle id="categorie-list-dialog">Liste des categories</DialogTitle>
      <DialogContent>
        <div className="m-5 mt-3 mb-3">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">N°</TableCell>
                <TableCell align="center">Catégorie</TableCell>
                <TableCell align="center">Opération</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Boucle pour afficher les lignes du tableau en fonction de la pagination */}
              {CategorieList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((List) => (
                <TableRow key={CategorieList.ID_CAT}>
                  <TableCell align="left">{List.ID_CAT}</TableCell>
                  <TableCell align="center">{List.LABEL_CAT}</TableCell>
                  <TableCell align="center">
                    {/* Bouton pour sélectionner une ligne du tableau */}
                    <IconButton onClick={() => {
                      handleSelectCatRow(List);
                      closeCatModal();
                    }}>
                      <DriveFileMoveIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>

          {/* Pagination pour naviguer entre les pages du tableau */}
          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={CategorieList.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
            className="mt-5"
          />
        </div>
      </DialogContent>
      <DialogActions>
        {/* Bouton pour fermer le dialogue */}
        <Button onClick={closeCatModal} color="warning">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategorieListModal;