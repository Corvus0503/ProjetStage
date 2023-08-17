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
  import UpdateCompte from "./UpdateCompte";
  import NewCompte from "./NewCompte";
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
  const Compte = () => {
    const [page, setPage] = useState(0);
    const [Compte, setCompte] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [CompteListe, setCompteList] = useState([]);
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
  
    const handleDeleteUser = (Compte) => {
      setCompte(Compte);
       Swal.fire({
        title: 'Confirmation',
        text: "Etes vous sur de supprimer cette Compte ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Supprimer'
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(Compte)
          Swal.fire(
            'Supprimé!',
            'Catégorie supprimeé.',
            'success'
          )
        }
      })
    };
  
    const handleConfirmationResponse = () => {
      handleDelete(Compte)
      handleDialogClose()
    };
  
  
  
  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Compte');
      setCompteList(response.data);
      console.log("data loaded");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = id=>{
      axios.delete(`http://localhost:8080/Compte/${id}`).then(reponse=>{
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
    console.log(CompteListe)
  
    return (
      <Container>
          <div className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Liste des Comptes" }]} />
          </div>
          <div className=" text-start mb-3">
            <button className="btn btn-primary " onClick={ouvrirModal} > <AddCircleIcon/> Nouvelle Compte </button>
            <NewCompte chargerListAdmin={chargerListAdmin} isOpen={isModalOuverte} onClose={fermerModal} />
          </div>
              <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
              <div className="m-5 mt-3 mb-3">
                <h1 align="left"> Liste des Comptes </h1>
                  <hr />
                  
                      <StyledTable>
                          <TableHead>
                              <TableRow>
                              <TableCell align="left"> Compte</TableCell>
                              <TableCell align="center"> Désignation Compte </TableCell>
                              <TableCell align="center"> Opération </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {CompteListe
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((List) => (
                                  <TableRow key={CompteListe.NUM_CMPT}>
                                      <TableCell align="left">{List.NUM_CMPT}</TableCell>
                                      <TableCell align="center">{List.DESIGNATION_CMPT}</TableCell>
                                      <TableCell align="center"  >
  
                                      <IconButton >
                                          <UpdateCompte  List={List} DivisionListe={CompteListe}  chargerListAdmin={chargerListAdmin} />
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
                      count={CompteListe.length}
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
  
  export default Compte;