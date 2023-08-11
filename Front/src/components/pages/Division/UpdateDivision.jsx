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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// // const MenuProps = {
// //   PaperProps: {
// //     style: {
// //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// //       width: 250,
// //     },
// //   },
// // };

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


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "13px",
}));

const UpdateDivision = ({List, chargerListAdmin}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    setDivision(List)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [division,setDivision] = useState({
    CODE_DIVISION:"",
    CODE_SER:"",
    LABEL_DIVISION:""
  })



const updatedivision = id => {
  axios.put(`http://localhost:8080/division/${id}`,division).then(response => {
    setDivision({
        CODE_DIVISION:"",
        CODE_SER:"",
        LABEL_DIVISION:""
    });
    chargerListAdmin()
    closeModal()
    console.log('division modifier avec succès.');
  }).catch(error =>{console.error(error);})
}


  const handleChange = (e) => {
    setDivision({ ...division, [e.target.name]: e.target.value });
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
                name="CODE_DIVISION"
                id="standard-basic"
                value={division.CODE_DIVISION}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Code De Division "
                placeholder='Saisir le Code De Division...... '
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              />

              <TextField
                type="text"
                name="CODE_SER"
                id="standard-basic"
                value={division.CODE_SER }
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Code De Service"
                placeholder='Saisir le Code De Service...... '
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              />
              <TextField
                type="text"
                name="LABEL_DIVISION"
                label="Label de division"
                onChange={handleChange}
                value={division.LABEL_DIVISION}
                placeholder='Saisir le Libellé De Division...... '
                validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                errorMessages={["this field is required"]}
              />

              <div className="text-center" >
              <Button onClick={() => {
                    updatedivision(division.CODE_DIVISION)
                    console.log(division)
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

export default UpdateDivision;