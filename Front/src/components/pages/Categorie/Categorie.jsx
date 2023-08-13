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
  import ConfirmationDialog from "../../Utils/ConfirmationDialog";
  import DeleteIcon from '@mui/icons-material/Delete';
  import Breadcrumb from "../../Utils/Breadcrumb";
  import UpdateCategorie from "./UpdateCategorie";
  import NewCategorie from "./NewCategorie";
  import AddCircleIcon from '@mui/icons-material/AddCircle';
  import Swal from 'sweetalert2'
  
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
  const Categorie = () => {
    const [page, setPage] = useState(0);
    const [categorie, setCategorie] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [CategorieListe, setCategorieList] = useState([]);
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
  
    const [isModalOuverte, setIsModalOuverte] = useState(false);
  
    const ouvrirModal = () => {
      setIsModalOuverte(true);
    };
  
    const fermerModal = () => {
      setIsModalOuverte(false);
    };
  
  
    const handleDialogClose = () => {
      setShouldOpenConfirmationDialog(false);
      chargerListAdmin();
    };
  
    const handleDeleteUser = (categorie) => {
      setCategorie(categorie);
       Swal.fire({
        title: 'Confirmation',
        text: "Etes vous sur de supprimer cette Categorie ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Supprimer'
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(categorie)
          Swal.fire(
            'Supprimé!',
            'Catégorie supprimeé.',
            'success'
          )
        }
      })
    };
  
    const handleConfirmationResponse = () => {
      handleDelete(categorie)
      handleDialogClose()
    };
  
  
  
  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categorie');
      setCategorieList(response.data);
      console.log("data loaded");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = id=>{
      axios.delete(`http://localhost:8080/categorie/${id}`).then(reponse=>{
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
    console.log(CategorieListe)
  
    return (
      <Container>
          <div className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Liste des Division" }]} />
          </div>
          <div className=" text-start mb-3">
            <button className="btn btn-primary " onClick={ouvrirModal} > <AddCircleIcon/> Nouvelle Categorie </button>
            <NewCategorie chargerListAdmin={chargerListAdmin} isOpen={isModalOuverte} onClose={fermerModal} />
          </div>
              <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
              <div className="m-5 mt-3 mb-3">
                <h1 align="left"> Liste des Categories </h1>
                  <hr />
                  
                      <StyledTable>
                          <TableHead>
                              <TableRow>
                              <TableCell align="left"> ID categorie </TableCell>
                              <TableCell align="center"> Label de Categorie </TableCell>
                              <TableCell align="center"> Num Compte </TableCell>
                              <TableCell align="center"> Opération </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {CategorieListe
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((List) => (
                                  <TableRow key={CategorieListe.ID_CAT}>
                                      <TableCell align="left">{List.ID_CAT}</TableCell>
                                      <TableCell align="center">{List.LABEL_CAT}</TableCell>
                                      <TableCell align="center">{List.NUM_CMPT}</TableCell>
                                      <TableCell align="center"  >
  
                                      <IconButton >
                                          <UpdateCategorie  List={List} DivisionListe={CategorieListe}  chargerListAdmin={chargerListAdmin} />
                                      </IconButton>
  
                                      <IconButton onClick={()=>handleDeleteUser(List.ID_CAT)}>
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
                      count={CategorieListe.length}
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
  
  export default Categorie;