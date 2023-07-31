import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import {
    IconButton, Grid, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,
  } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";


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
                        <TextField 
                            placeholder="Categorie..."
                            label='Catégorie'
                            name=""
                            // onChange={handleChange}
                            // value=""
                            validators={["required","minStringLength: 1"]}
                            errorMessages={['Vous devez remplir ce Champs']}
                         />

                        <TextField 
                            placeholder="Article..."
                            label='Article'
                            name=""
                            // onChange={handleChange}
                            // value=""
                            validators={["required","minStringLength: 1"]}
                            errorMessages={['Vous devez remplir ce Champs']}
                        />

                        <TextField 
                            placeholder="Quantité..."
                            label='Quantité'
                            name=""
                            // onChange={handleChange}
                            // value=""
                            validators={["required","minStringLength: 1"]}
                            errorMessages={['Vous devez remplir ce Champs']}
                        />
                        
                    </Grid>
                    <hr />
                    <div >

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
                    </div>
                 </div>
                </ValidatorForm>

            </Container>    
        </div>
    )
}

export default NewBesoin;