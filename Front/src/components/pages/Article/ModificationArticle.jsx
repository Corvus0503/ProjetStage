import React from 'react'
import Modal from 'react-modal';
import {
  Button,
  Grid,
  styled,
} from "@mui/material";
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
    height: '80%',
    width: '70%'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));
const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const ModificationArticle = ({List, chargerListAdmin}) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    setArticle(List)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [article,setArticle] = useState({
    FORMULE: " ",
    DESIGNATION_ART:" ",
    SPECIFICITE_ART:" ",
    UNITE_ART:" ",
    EFFECTIF_ART:" ",
    ID_CAT:" ",
  })



const updateArticle = id => {
  axios.put(`http://localhost:8080/article/${id}`, article).then(response => {
    setArticle({
        FORMULE: " ",
    	DESIGNATION_ART:" ",
    	SPECIFICITE_ART:" ",
    	UNITE_ART:" ",
    	EFFECTIF_ART:" ",
    	ID_CAT:" ",
    });
    chargerListAdmin()
    closeModal()
    console.log('Article modifier avec succès.');
  }).catch(error =>{console.error(error);})
}


  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      ><ValidatorForm onError={() => null} >
        <div className="container card center shadow mt-4 p-5">
        <h1 align="left"> Modification d'un Article </h1>
        <hr />
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              
            <TextField
                type="text"
                name="FORMULE"
                id="standard-basic"
                value={article.FORMULE}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Formule"
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              />

              <TextField
                type="text"
                name="DESIGNATION_ART"
                id="standard-basic"
                value={article.DESIGNATION_ART}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Désignation"
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              />

              <TextField
                type="text"
                name="SPECIFICITE_ART"
                id="standard-basic"
                value={article.SPECIFICITE_ART }
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Spécification"
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
                type="text"
                name="UNITE_ART"
                label="Unité"
                onChange={handleChange}
                value={article.UNITE_ART}
                validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                errorMessages={["this field is required"]}
              />

              <TextField
                type="number"
                name="EFFECTIF_ART"
                label="Effectif"
                onChange={handleChange}
                value={article.EFFECTIF_ART}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />  

              <TextField
                type="number"
                name="ID_CAT"
                label="ID Catégorie"
                value={article.ID_CAT}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required", "email non valide"]}
              />
            </Grid>
	      <Button onClick={() => {
          updateArticle(article.FORMULE)
          console.log(article)
        }} 	color="success" variant="contained" >
          {/*<Icon>send</Icon>*/}
          Modifier
        </Button>
          </Grid>
        </div>

      </ValidatorForm>

      </Modal>
    </div>
  );
}

export default ModificationArticle