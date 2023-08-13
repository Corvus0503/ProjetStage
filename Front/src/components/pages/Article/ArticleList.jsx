import {
  IconButton,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
import ModificationArticle from "./ModificationArticle";
import ConfirmationDialog from "../../Utils/ConfirmationDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumb from "../../Utils/Breadcrumb";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

//A ne pas toucher
const ArticleList = () => {
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [ArticleListe, setArticleListe] = useState([]);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);

  const handleDialogClose = () => {
    setShouldOpenConfirmationDialog(false);
    chargerListAdmin();
  };

  const handleDeleteUser = (user) => {
    setUser(user);
    setShouldOpenConfirmationDialog(true);
  };

  const handleConfirmationResponse = () => {
    handleDelete(user)
    handleDialogClose()
  };

const chargerListAdmin = async () => {
  try {
    const response = await axios.get('http://localhost:8080/article');
    setArticleListe(response.data);
    console.log("data loaded");
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = id=>{
    axios.delete(`http://localhost:8080/article/${id}`).then(reponse=>{
      chargerListAdmin()}).catch (error =>{
      console.error(`Erreur: ${error}`)
}) 
}

useEffect(() => {
  chargerListAdmin();
}, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(ArticleListe)



  return (
    <Container>
        <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Liste des Article" }]} />
        </div>
            <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
            <div className="m-5 mt-3 mb-3">
              <h1 align="left"> Article </h1>
                <hr />
                
                    <StyledTable>
                    <TableHead>
                        <TableRow>
                        <TableCell align="left"> N° </TableCell>
                        <TableCell align="center"> Categorie  </TableCell>
                        <TableCell align="center"> Designation </TableCell>
                        <TableCell align="center"> Spécification </TableCell>
                        <TableCell align="center"> Prix d'article </TableCell>
                        <TableCell align="center"> Unité </TableCell>
                        <TableCell align="center"> Opération </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ArticleListe
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((List) => (
                            <TableRow key={ArticleListe.FORMULE}>
                            <TableCell align="left">{List.FORMULE}</TableCell>
                            <TableCell align="center">{List.LABEL_CAT}</TableCell>
                            <TableCell align="center">{List.DESIGNATION_ART}</TableCell>
                            <TableCell align="center">{List.SPECIFICITE_ART}</TableCell>
                            <TableCell align="center">{List.PRIX_ART}</TableCell>
                            <TableCell align="center">{List.UNITE_ART}</TableCell>
                            <TableCell align="center"  >
                                <IconButton >
                                <ModificationArticle  List={List} ArticleList={ArticleList}  chargerListAdmin={chargerListAdmin} />
                                </IconButton>
                                <IconButton onClick={()=>handleDeleteUser(List.FORMULE)}>
                                <DeleteIcon color="error"/>
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </StyledTable>

                    <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={ArticleListe.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                    className="mt-5"
                    />

                    {shouldOpenConfirmationDialog && (
                        <ConfirmationDialog
                        text="Voulez vous Supprimer ?"
                        open={shouldOpenConfirmationDialog}
                        onConfirmDialogClose={handleDialogClose}
                        onYesClick={handleConfirmationResponse}
                        />
                    )}
                </div>
            </Card>
    </Container>

    
  );
};

export default ArticleList;