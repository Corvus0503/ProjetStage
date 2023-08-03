import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import {
  Button,
  Grid,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal} from '@mui/material';

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
  boxShadow: theme.shadows[5],
}));
const CustomModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const NewCategorie = ({ isOpen, onClose }) => {
  const [state, setState] = useState({ date: new Date() });

  const [categorie,setCategorie] = useState({
    ID_CAT:"",
    LABEL_CAT:"",
    NUM_CMPT:""
  })



  const addNewCategorie = async()=>{
    try {
        await axios.post(`http://localhost:8080/categorie`, categorie)
        alert("submited")


    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {

    console.log(categorie)
    addNewCategorie();
    setCategorie({

      ID_CAT:"",
      LABEL_CAT:"",
      NUM_CMPT:""      
      
    })
  };

  

  const handleChange = (event) => {
    event.persist();
    setCategorie({ ...categorie, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    date
  } = state;

  const handleCloseModal = () => {
    onClose();
  };

  const loading = ()=> {
    return(<div class="spinner-border text-warning"></div>)
  }
  


  return (

    <CustomModal open={isOpen} onClose={onClose}>
        <Container>            
              <ValidatorForm onError={() => null} onSubmit={handleSubmit} >
                  <div className=" card center shadow p-5">
                  <h1 align="left"> Ajout d'un nouveau Categorie </h1>
                  <hr />
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        
                      <TextField
                          type="text"
                          name="ID_CAT"
                          label="Code Categorie"
                          placeholder="Saisir ici le code de Categorie...."
                          onChange={handleChange}
                          value={categorie.ID_CAT}
                          validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                          errorMessages={["this field is required"]}
                        />              

                        <TextField
                          type="text"
                          name="LABEL_CAT"
                          id="standard-basic"
                          placeholder="Saisir ici le Labelle de Catégorie..."
                          value={categorie.LABEL_CAT}
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          label="Labelle de Catégorie"
                          validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
                        />

                        <TextField
                          type="text"
                          name="NUM_CMPT"
                          id="standard-basic"
                          value={categorie.NUM_CMPT }
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          placeholder="Saisir ici le nu méro de Compte..."
                          label="Numéro de compte"
                          validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                label="Date picker"
                                id="mui-pickers-date"
                                sx={{ mb: 2, width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>

                        <div className="text-center">

                        <Button color="primary" className="me-2 "  variant="outlined" type="submit">
                            Enregister
                          </Button>
                          <Button color="secondary" className=" me-2 ms-1 ps-4 pe-4" variant="outlined" onClick={handleCloseModal}>
                            Fermer
                          </Button>
                          
                        </div>
                    </Grid>
                  </div>

              </ValidatorForm>

        </Container> 

    
    </CustomModal>


    
  );
};

export default NewCategorie;
