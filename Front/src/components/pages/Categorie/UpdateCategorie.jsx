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

const UpdateCategorie = ({List, chargerListAdmin}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    setCategorie(List)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [categorie,setCategorie] = useState({
        ID_CAT: "",
        LABEL_CAT: "",
        NUM_CMPT: "" 
  })



const updateCategorie = id => {
  axios.put(`http://localhost:8080/categorie/${id}`, categorie).then(response => {
    setCategorie({
        ID_CAT: "",
        LABEL_CAT: "",
        NUM_CMPT: "" 
    });
    chargerListAdmin()
    closeModal()
    console.log('division modifier avec succès.');
  }).catch(error =>{console.error(error);})
}


  const handleChange = (e) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
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
              
            {/* <TextField
                type="text"
                name="FORMULE"
                id="standard-basic"
                value={division.FORMULE}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Formule"
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              /> */}

        <TextField
            type="text"
            name="ID_CAT"
            label="Code Division"
            placeholder="Saisir ici le code de division...."
            onChange={handleChange}
            value={categorie.ID_CAT}
            validators={["required","minStringLength: 1", "maxStringLength: 9"]}
            errorMessages={["this field is required"]}
        />              

        <TextField
            type="text"
            name="LABEL_CAT"
            id="standard-basic"
            placeholder="Saisir ici le code de Service...."
            value={categorie.LABEL_CAT}
            onChange={handleChange}
            errorMessages={["this field is required"]}
            label="Code Service"
            validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
        />

        <TextField
            type="text"
            name="NUM_CMPT"
            id="standard-basic"
            value={categorie.NUM_CMPT }
            onChange={handleChange}
            errorMessages={["this field is required"]}
            placeholder="Saisir ici le nom de Division...."
            label="Libellé"
            validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
        />

              <div className="text-center" >
              <Button onClick={() => {
                    updateCategorie(categorie.ID_CAT)
                    console.log(categorie)
                    }} 	color="success" variant="outlined" className='me-2 '>
                    {/*<Icon>send</Icon>*/}
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

export default UpdateCategorie;