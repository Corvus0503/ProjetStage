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
  import UpdateService from "./UpdateService";
  import NewService from "./NewService";
  import AddCircleIcon from '@mui/icons-material/AddCircle';
  
  
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
  const Service = () => {
    const [page, setPage] = useState(0);
    const [Service, setService] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ServiceListe, setServiceList] = useState([]);
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
  
    const handleDeleteUser = (Service) => {
      setService(Service);
      setShouldOpenConfirmationDialog(true);
    };
  
    const handleConfirmationResponse = () => {
      handleDelete(Service)
      handleDialogClose()
    };
  
  
  
  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Service');
      setServiceList(response.data);
      console.log("data loaded");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = id=>{
      axios.delete(`http://localhost:8080/Service/${id}`).then(reponse=>{
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
    console.log(ServiceListe)
  
    return (
      <Container>
          <div className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Liste des Service" }]} />
          </div>
          <div className=" text-start mb-3">
            <button className="btn btn-primary " onClick={ouvrirModal} > <AddCircleIcon/> Nouveau Service </button>
            <NewService isOpen={isModalOuverte} onClose={fermerModal} />
          </div>
              <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
              <div className="m-5 mt-3 mb-3">
                <h1 align="left"> Liste des Service </h1>
                  <hr />
                  
                      <StyledTable>
                          <TableHead>
                              <TableRow>
                              <TableCell align="left"> Code de Service </TableCell>
                              <TableCell align="center">  Libellé  de Service  </TableCell>
                              <TableCell align="center"> Entete1 de Service </TableCell>
                              <TableCell align="center"> Entete2 de Service </TableCell>
                              <TableCell align="center"> Entete3 de Service </TableCell>
                              <TableCell align="center"> Entete4 de Service </TableCell>
                              <TableCell align="center"> Entete5 de Service </TableCell>
                              <TableCell align="center"> Sigle de Service </TableCell>
                              <TableCell align="center"> Ville de Service </TableCell>
                              <TableCell align="center"> Adresse de Service</TableCell>
                              <TableCell align="center"> Contact de Service</TableCell>
                              <TableCell align="center"> Opération </TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {ServiceListe
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((List) => (
                                  <TableRow key={ServiceListe.CODE_SER}>
                                      <TableCell align="left">{List.CODE_SER}</TableCell>
                                      <TableCell align="center">{List.LIBELLE}</TableCell>
                                      <TableCell align="center">{List.ENTETE1}</TableCell>
                                      <TableCell align="center">{List.ENTETE2}</TableCell>
                                      <TableCell align="center">{List.ENTETE3}</TableCell>
                                      <TableCell align="center">{List.ENTETE4}</TableCell>
                                      <TableCell align="center">{List.ENTETE5}</TableCell>
                                      <TableCell align="center">{List.SIGLE}</TableCell>
                                      <TableCell align="center">{List.VILLE}</TableCell>
                                      <TableCell align="center">{List.ADRESSE}</TableCell>
                                      <TableCell align="center">{List.CONTACT}</TableCell>
                                      <TableCell align="center"  >
  
                                          
                                      <IconButton >
                                          <UpdateService  List={List} ServiceListe={ServiceListe}  chargerListAdmin={chargerListAdmin} />
                                      </IconButton>
  
                                      <IconButton onClick={()=>handleDeleteUser(List.CODE_SER)}>
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
                      count={ServiceListe.length}
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
  
  export default Service;