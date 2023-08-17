import {
  Button,
  Grid,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal} from '@mui/material';
import Swal from 'sweetalert2'

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

const NewCompte = ({ isOpen, onClose, chargerListAdmin }) => {

  const [Compte,setCompte] = useState({
      DESIGNATION_CMPT: "",
      NUM_CMPT: "" 
  })

  const [isModalOpen, setIsModalOpen] = useState(false);


    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const addNewCompte = async()=>{

    try {

        await axios.post(`http://localhost:8080/Compte`,Compte)
        chargerListAdmin()
    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {

    event.preventDefault(); // Empêcher la soumission du formulaire

    if (!Compte.DESIGNATION_CMPT || !Compte.NUM_CMPT) {
        onClose();
        Swal.fire({
        icon: 'error',
        title: 'Champs vides',
        text: 'Veuillez remplir tous les champs avant de continuer.',
        });
        return;   
    }

    onClose();
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez vous enregister cette Compte ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Enregistrer'
    }).then((result) => {
      if (result.isConfirmed) {
        addNewCompte();
        Swal.fire(
          'Confirmé!',
          'Compte enregistré.',
          'success'
        )
      }
    })
    
    setCompte({
      DESIGNATION_CMPT: "",
      NUM_CMPT: ""    
    })
  };

  

  const handleChange = (event) => {
    event.persist();
    setCompte({ ...Compte, [event.target.name]: event.target.value });
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (

    <CustomModal open={isOpen} onClose={onClose}>
        <Container>            
              <ValidatorForm onError={() => null} >
                  <div className=" card center shadow p-5">
                  <h1 align="left"> Ajout d'une nouvelle Compte </h1>
                  <hr />
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                      <TextField
                          placeholder="Compte..."
                          label="Compte"
                          name="NUM_CMPT"
                          onChange={handleChange}
                          value={Compte.NUM_CMPT}
                          errorMessages={["this field is required"]}
                          validators={["required", "minStringLength: 1", "maxStringLength: 40"]}
                        />                              

                        <TextField
                          type="text"
                          name="DESIGNATION_CMPT"
                          id="standard-basic"
                          placeholder="Saisir la designation de Compte...."
                          value={Compte.DESIGNATION_CMPT}
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          label="Designation Compte"
                          validators={["required", "minStringLength: 1", "maxStringLength: 40"]}
                        />

                        <div className="text-center">

                        <Button color="primary" className="me-2 "  variant="outlined" type="submit" onClick={handleSubmit}>
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

export default NewCompte;