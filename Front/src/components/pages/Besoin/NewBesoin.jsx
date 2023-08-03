import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import {
    IconButton,Card, Grid, styled, Table,Button, TableBody, TableCell, TableHead, TablePagination, TableRow,
  } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AttachFileIcon from '@mui/icons-material/AttachFile';//join files
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';//join files2
import FileUploadIcon from '@mui/icons-material/FileUpload';//join files3
import MenuIcon from '@mui/icons-material/Menu';//menu
import ArticleListModal from "./ListeArticle";
import ParentComponent from "./test";



const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


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



const NewBesoin = () => {

    const [state, setState] = useState({ date: new Date() });

    const [besoin, setBesoin] = useState({
        MATRICULE:'',
        FORMULE:'',
        DATE_BESOIN:'',
        QUANTITE:'',
        UNITE:'',
        ETAT_BESOIN:'',
    })

     const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  
    const addNewBesoin = async()=>{
        try {
            await axios.post(`http://localhost:8080/besoin`, besoin)
            alert("submited")    
    
        } catch (error) {
            console.log(`Erreur : ${error}`)
        }
      }

      const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(besoin)
        addNewBesoin();
      };

      const handleChange = (event) => {
        event.persist();
        setBesoin({ ...besoin, [event.target.name]: event.target.value });
      };
    
      const handleDateChange = (date) => setState({ ...state, date });    
      const {
        date
      } = state;


    

    return (
        <div>
            <Container>

                <ValidatorForm onError={() => null} >

                <div className=" card center shadow p-5">
                    <h1 align="left"> Ajout d'un nouveau Besoin </h1>
                    <hr />
                    <Grid>
                        <div className="text-start ">
                            <div className="mb-3">
                                <label className="h4 ms-2 " > Catégorie : </label>
                                <div class="input-group ">
                                    <input type="text" class="form-control" placeholder="Entrer le Catégorie....." required />
                                    <button className="p-3 ps-3 pe-3 btn btn-outline-primary" onClick={handleModalOpen}><FileUploadIcon/> </button>
                                </div> 
                            </div>
                            <div className="mb-3"> 
                                <label className="h4 ms-2" > Article : </label>
                                <div class="input-group ">
                                    <input type="text" class="form-control" name="FORMULE" value={besoin.FORMULE} onChange={handleChange} placeholder="Entrer l'Article....." required />
                                    <button className="p-3 btn btn-outline-primary" onClick={handleModalOpen}><FileUploadIcon/> </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="h4 ms-2" > Quantité : </label>
                                <div class="input-group ">
                                    <input type="text" class="form-control" placeholder="Entrer la Quantité....." required />
                                    <button className="p-3 ps-3 pe-3 pb-2 btn btn-outline-primary"> <h5> Unité </h5> </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="h4 ms-2" > Prix Unitaire de l'Article : </label>
                                <div class="input-group ">
                                    <input type="text" class="form-control" placeholder="Entrer la Prix Unitaire....." required />
                                    <button className="p-3 pb-2 btn btn-outline-primary"> <h5> Ariary </h5> </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-11">
                                     <TextField 
                                        placeholder="Matricule de l'Agent..."
                                        label="Matricule de l'Agent"
                                        name="MATRICULE"
                                        onChange={handleChange}
                                        value={besoin.MATRICULE}
                                        validators={["required","minStringLength: 1"]}
                                        errorMessages={['Vous devez remplir ce Champs']}
                                    />

                                </div>
                                <div className="col-1">
                                    <button className="p-3 ps-5 pe-5 btn btn-outline-warning" onClick={handleModalOpen}><FileUploadIcon/> </button>
                                    <ArticleListModal isModalOpen={isModalOpen} closeModal={handleModalClose} />
                                    {/* <button className="p-3 ps-5 pe-5 btn btn-outline-warning">
                                        test
                                    </button> */}
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-11">
                                    <TextField 
                                        placeholder="Quantité..."
                                        label='Quantité'
                                        name=""
                                        // onChange={handleChange}
                                        // value=""
                                        validators={["required","minStringLength: 1"]}
                                        errorMessages={['Vous devez remplir ce Champs']}
                                    />
                                </div>
                                <div className="col-1">
                                <button className="p-3 ps-5 pe-5 btn btn-outline-warning" onClick={handleModalOpen}><FileUploadIcon/> </button>
                                </div>
                                
                            </div>

                            

                            
                        </div>                        
                    </Grid>

                    <div className="text-start">
                        <button className="btn btn-primary"> 
                             <AddCircleIcon color="white"/> Ajouter
                        </button>

                    </div>

                    <hr />
                    {/* <div className="container">

                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th> Numérotation </th>
                                    <th> Catégorie </th>
                                    <th> Désignation </th>
                                    <th> Spécification </th>
                                    <th> Quantité </th>
                                    <th> Unité </th>
                                    <th> Opération  </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
  
                        </table>
                        <hr />
                        <div className="text-start m-2">
                            <button className="btn btn-success">
                                Enregistrer
                            </button>
                        </div>
                    </div> */}
                    {/* <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
                        <div className="m-5 mt-3 mb-3">
                        <h1 align="left"> Ajout d'un nouveau Article </h1>
                            <hr />
                            
                                <StyledTable>
                                <TableHead>
                                    <TableRow>
                                    <TableCell align="left"> N° </TableCell>
                                    <TableCell align="center"> Categorie  </TableCell>
                                    <TableCell align="center"> Designation </TableCell>
                                    <TableCell align="center"> Spécification </TableCell>
                                    <TableCell align="center"> Effectif </TableCell>
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
                                        <TableCell align="center">{List.EFFECTIF_ART}</TableCell>
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
                    </Card> */}


                 </div>
                </ValidatorForm>

            </Container>    
        </div>
    )
}

export default NewBesoin;