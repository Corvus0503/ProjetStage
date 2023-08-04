// Import des dépendances nécessaires
import React, { useState } from "react";
import axios from 'axios';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid, styled } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArticleListModal from "./ListeArticle";
import InputAdornment from "@material-ui/core/InputAdornment";

// Styling du composant TextField à l'aide de Styled-components
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

// Styling du container du composant principal à l'aide de Styled-components
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// Composant principal du formulaire de nouveau besoin
const NewBesoin = (user) => {
  // State pour stocker les données de l'article sélectionné
  const [selectedArticle, setSelectedArticle] = useState({
    DESIGNATION_ART: "",
    FORMULE: "",
    ID_CAT: "",
    LABEL_CAT: "",
    SPECIFICITE_ART: "",
    UNITE_ART: "",
  });

  // State pour stocker les données du nouveau besoin à ajouter
  const [besoin, setBesoin] = useState({
    MATRICULE: '',
    FORMULE: '',
    DATE_BESOIN: '',
    QUANTITE: '',
    UNITE: '',
    ETAT_BESOIN: '',
  });

  // State pour gérer l'ouverture et la fermeture de la modal de liste d'articles
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir la modal de liste d'articles
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modal de liste d'articles
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Fonction pour gérer la sélection d'un article dans la modal
  const handleRowSelect = (selectedRow) => {
    setSelectedArticle(selectedRow);
  };

  // Fonction pour envoyer les données du nouveau besoin au serveur
  const addNewBesoin = async () => {
    try {
      await axios.post(`http://localhost:8080/besoin`, besoin);
      alert("Votre demande a été soumise avec succès !");
    } catch (error) {
      console.log(`Erreur lors de l'envoi : ${error}`);
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(besoin);
    addNewBesoin();
  };

  // Fonction pour gérer les changements dans les champs de saisie
  const handleChange = (event) => {
    event.persist();
    setBesoin({ ...besoin, [event.target.name]: event.target.value });
  };

  // Rendu du composant principal
  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <div className="card center shadow p-5">
            <h1 align="left"> Ajout d'un nouveau Besoin </h1>
            <hr />
            <Grid>
              <TextField
                placeholder="Matricule de l'Agent..."
                label="Matricule de l'Agent"
                name="MATRICULE"
                onChange={handleChange}
                value={selectedArticle.DESIGNATION_ART}
                validators={["required", "minStringLength: 1"]}
                errorMessages={['Ce champ est obligatoire']}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <button className="btn btn-outline-primary" onClick={handleModalOpen}>
                        <FileUploadIcon />
                      </button>
                      <ArticleListModal isModalOpen={isModalOpen} closeModal={handleModalClose} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="Quantité..."
                label='Quantité'
                name=""
                // onChange={handleChange}
                // value=""
                validators={["required", "minStringLength: 1"]}
                errorMessages={['Ce champ est obligatoire']}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <button className="btn btn-outline-primary" onClick={handleModalOpen}>
                        <FileUploadIcon />
                      </button>
                      <ArticleListModal onRowSelect={handleRowSelect} isModalOpen={isModalOpen} closeModal={handleModalClose} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <div className="text-start">
              <button className="btn btn-primary" onClick={handleSubmit}>
                <AddCircleIcon color="white" /> Ajouter
              </button>
            </div>

            <hr />
          </div>
        </ValidatorForm>
      </Container>
    </div>
  );
}

export default NewBesoin;
