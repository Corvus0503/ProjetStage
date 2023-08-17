import React from 'react'
import Modal from 'react-modal';
import {
  Button,
  Grid,
  styled,
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios"


const customStyles = {
    content: {
      top: '50%',
      left: '55%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Ajoute une ombre légère
      backgroundColor: '#fff', // Couleur de fond de la modal
      borderRadius: '8px', // Ajoute des coins arrondis
      padding: '16px', // Ajoute un peu d'espace intérieur
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur d'overlay (noir avec une opacité de 50%)
    },
  };

Modal.setAppElement(document.getElementById('root'));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "13px",
}));

const UpdateCompte = ({List, chargerListAdmin}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    setCompte(List)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [compte,setCompte] = useState({
        DESIGNATION_CMPT: "",
        NUM_CMPT: "" 
  })



const updateCompte = id => {
  axios.put(`http://localhost:8080/compte/${id}`, compte).then(response => {
    setCompte({
        DESIGNATION_CMPT: "",
        NUM_CMPT: "" 
    });
    chargerListAdmin()
    closeModal()
    console.log('division modifier avec succès.');
  }).catch(error =>{console.error(error);})
}


  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  return (
    <>
      <IconButton onClick={openModal} className='' > <EditIcon color='primary'/>
       </IconButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles }
      ><ValidatorForm onError={() => null} >
        <div >
        <h1 align="left"> Modification d'un division </h1>
        <hr />
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }} >            


            <TextField
                type="text"
                name="NUM_CMPT"
                id="standard-basic"
                value={compte.NUM_CMPT }
                onChange={handleChange}
                errorMessages={["this field is required"]}
                placeholder="Saisir ici le nom de Division...."
                label="Compte"
                validators={["required", "minStringLength: 4", "maxStringLength: 6"]}
            />
             <TextField
                type="text"
                name="DESIGNATION_CMPT"
                id="standard-basic"
                placeholder="Saisir ici le code de Service...."
                value={compte.DESIGNATION_CMPT}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Désignation Compte"
                validators={["required", "minStringLength: 1", "maxStringLength: 20"]}
            />

            <div className="text-center" >
            <Button onClick={() => {
                updateCompte(compte.NUM_CMPT)
                console.log(compte)
                }} 	color="success" variant="outlined" className='me-2 '>
                    Modifier
            </Button>
            <Button color="secondary" className=" me-2 ms-1 ps-4 pe-4" variant="outlined" onClick={closeModal}>Annuler</Button>
            </div>
            
          </Grid>
        </div>
      </ValidatorForm>

      </Modal>
    </>
  );
}

export default UpdateCompte;