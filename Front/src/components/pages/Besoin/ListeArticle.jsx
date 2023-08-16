import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

// Composant pour afficher la liste des articles dans une modal
const ArticleListModal = ({ isModalOpen, closeModal, onRowSelect, idCat }) => {
  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [articleList, setArticleList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticleList = articleList.filter(article =>
    article.DESIGNATION_ART.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.SPECIFICITE_ART.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.PRIX_ART.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.UNITE_ART.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Utilisation de useEffect pour charger la liste des articles lorsque l'idCat change
  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/articleSelected/${idCat}`);
        setArticleList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (idCat) {
      fetchArticleList();
    }
  }, [idCat]);

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
      <input
        type="text"
        placeholder="Search article..."
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <button onClick={() => setSearchQuery(" ")}>X</button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Désignation</TableCell>
              <TableCell align="center">Spécification</TableCell>
              <TableCell align="center">Prix</TableCell>
              <TableCell align="center">Unité</TableCell>
              <TableCell align="center">Opération</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArticleList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(article => (
                <TableRow key={article.FORMULE}>
                  <TableCell align="center">{article.DESIGNATION_ART}</TableCell>
                  <TableCell align="center">{article.SPECIFICITE_ART}</TableCell>
                  <TableCell align="center">{article.PRIX_ART}</TableCell>
                  <TableCell align="center">{article.UNITE_ART}</TableCell>
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
          count={articleList.length}
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
