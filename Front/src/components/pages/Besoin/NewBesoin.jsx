// Import des dépendances nécessaires
import React, { useState } from "react";
import axios from 'axios';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid, styled } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArticleListModal from "./ListeArticle";
import InputAdornment from "@material-ui/core/InputAdornment";
import CategorieListModal from "./ListeCategorieModale.jsx";

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
  // State pour stocker les données de l'article et Categorie sélectionné
  const [selectedCategorie, setSelectedCategorie] = useState({
    ID_CAT: "",
    LABEL_CAT: "",
  });

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
    LABEL_CAT:"",
    FORMULE: '',
    DATE_BESOIN: '',
    QUANTITE: '',
    UNITE: '',
    ETAT_BESOIN: '',
  });

  // State pour gérer l'ouverture et la fermeture de la modal de liste d'articles et Catégorie
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalCatOpen,setIsModalCatOpen] = useState(false);

  // Fonction pour ouvrir la modal de liste d'articles et de Categories
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handelModalCatOpen =()=>{
    setIsModalCatOpen(true);
  }

  // Fonction pour fermer la modal de liste d'articles et de Categories
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalCatClose = () => {
    setIsModalCatOpen(false);
  };

  // Fonction pour gérer la sélection d'un article et de Catégorie dans la modal
  const handleRowSelect = (selectedRow) => {
    setSelectedArticle(selectedRow);
    setUnité(selectedRow.UNITE_ART)
  };
  const handleRowCatSelect = (selectedCatRow) => {
    setSelectedCategorie(selectedCatRow);
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
    setSelectedArticle({ ...selectedArticle, [event.target.name]: event.target.value });
    setBesoin({...besoin, [event.target.name]: event.target.value})
  };

  const[unite,setUnité] = useState("Unité")
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
                placeholder="Categorie..."
                label='Catégorie'
                name=""
                // onChange={handleChange}
                value={selectedCategorie.LABEL_CAT}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                      <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} onClick={handelModalCatOpen}>
                        <FileUploadIcon />
                      </button>
                      <CategorieListModal onRowCatSelect={handleRowCatSelect} isModalCatOpen={isModalCatOpen} closeCatModal={handleModalCatClose} />
                    </InputAdornment>
                  ),
                }}
                />
              <TextField
                placeholder="Article..."
                label="Article"
                name="DESIGNATION_ART"
                onChange={handleChange}
                value={selectedArticle.DESIGNATION_ART}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                      <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} onClick={handleModalOpen}>
                        <FileUploadIcon />
                      </button>
                      <ArticleListModal isModalOpen={isModalOpen} closeModal={handleModalClose} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="Quantité..."
                type="number"
                label='Quantité'
                name="QUANTITE"
                // onChange={handleChange}
                value={besoin.QUANTITE}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                      <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} onClick={handleModalOpen}>
                        <h6 className="mt-2"> {unite} </h6>
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
