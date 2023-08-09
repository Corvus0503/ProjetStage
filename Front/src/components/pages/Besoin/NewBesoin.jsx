import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Grid, styled } from "@mui/material";
import { TablePagination } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArticleListModal from "./ListeArticle";
import InputAdornment from "@material-ui/core/InputAdornment";
import CategorieListModal from "./ListeCategorieModale.jsx";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Swal from 'sweetalert2';
// Création d'un composant TextField stylisé avec Styled-components
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

// Création d'un composant Container stylisé avec Styled-components
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// Définition du composant principal pour le formulaire de nouveau besoin
const NewBesoin = (user) => {
  // Utilisation de useState pour stocker les données de l'article et de la catégorie sélectionnée
  const [selectedCategorie, setSelectedCategorie] = useState({
    ID_CAT: "",
    LABEL_CAT: "",
  });

  const [idCat, setIdCat] = useState("");
  const [selectedArticle, setSelectedArticle] = useState({
    DESIGNATION_ART: "",
    FORMULE: "",
    ID_CAT: "",
    LABEL_CAT: "",
    SPECIFICITE_ART: "",
    UNITE_ART: "",
  });

  // Utilisation de useState pour stocker les données du nouveau besoin à ajouter
  const [besoin, setBesoin] = useState({
    NUM_BESOIN:"",
    MATRICULE: '',
    FORMULE: '',
    DATE_BESOIN:"",
    TIME_CONFIRM:"",
    DATE_CONFIRM:'',
    QUANTITE: '',
    UNITE: '',
    ETAT_BESOIN: '',
  });

  // Utilisation de useState pour gérer l'ouverture et la fermeture de la modal de liste d'articles et de catégories
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalCatOpen,setIsModalCatOpen] = useState(false);

  // Utilisation de useState pour gérer l'unité sélectionnée
  const [unite,setUnité] = useState("Unité");
  const [addedItems, setAddedItems] = useState([]);

  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [articleList, setArticleList] = useState([]);
  console.log(user.user.user.user[0].MATRICULE)
  // Fonction pour ouvrir la modal de liste d'articles et de catégories
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };


  const handelModalCatOpen =()=>{
    setIsModalCatOpen(true);
  }


  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fonction pour gérer la sélection d'un article et d'une catégorie dans la modal
  const handleRowSelect = (selectedRow) => {
    setSelectedArticle(selectedRow);
    setUnité(selectedRow.UNITE_ART);
  };

  const handleRowCatSelect = (selectedCatRow) => {
    setSelectedCategorie(selectedCatRow);
    setIdCat(selectedCatRow.ID_CAT); // Mettre à jour idCat lorsque la catégorie est sélectionnée
    //chargerListAdmin(selectedCatRow.ID_CAT); // Charger la liste d'articles correspondante
  };

  const handleAddItem = () => {
    if (!selectedArticle.FORMULE || !selectedCategorie.LABEL_CAT || !besoin.QUANTITE) {
      Swal.fire({
        icon: 'error',
        title: 'Champs vides',
        text: 'Veuillez remplir tous les champs requis avant d\'ajouter un élément.',
      });
      return;
    } 
    const newItem = {
      numerotation: selectedArticle.FORMULE,
      designation: selectedArticle.DESIGNATION_ART,
      categorie: selectedCategorie.LABEL_CAT,
      quantite: besoin.QUANTITE,
      unite: selectedArticle.UNITE_ART,
    };
  
    setAddedItems(prevItems => [...prevItems, newItem]);
    setBesoin({
      QUANTITE: '',
    })
    setSelectedArticle({DESIGNATION_ART:''})
    setSelectedCategorie({LABEL_CAT: ""})

  };
  
  // Fonction pour envoyer les données du nouveau besoin au serveur
// Fonction pour envoyer les données du nouveau besoin au serveur
const handleValidation = async () => {
  try {
    for (const item of addedItems) {
      const FORMULE= item.numerotation; // Assurez-vous que les propriétés sont correctes
      const QUANTITE=item.quantite;
      const UNITE=item.unite;
      const MATRICULE = user.user.user.user[0].MATRICULE;
      const DATE_BESOIN = format(new Date(), 'yyyy-MM-dd');
      const DATE_CONFIRM = null;
      const TIME_CONFIRM = null;
      const ETAT_BESOIN = 'En Attente';

      // Vérification des valeurs extraites
      console.log('MATRICULE:', MATRICULE);
      console.log('FORMULE:', FORMULE);
      console.log('DATE_BESOIN:', DATE_BESOIN);
      console.log('QUANTITE:', QUANTITE);
      console.log('UNITE:', UNITE);

      const response = await axios.post('http://localhost:8080/besoin', {
        MATRICULE,
        FORMULE,
        DATE_BESOIN,
        DATE_CONFIRM,
        TIME_CONFIRM,
        QUANTITE,
        UNITE, // Assurez-vous que la propriété est correcte
        ETAT_BESOIN,
      });

      Swal.fire({
        icon: 'success',
        title: 'Demande soumise',
        text: 'Votre demande a été soumise avec succès !',
      });

      console.log('Besoin ajouté avec succès:', response.data);
    }

    // Réinitialiser la liste des articles ajoutés
    setAddedItems([]);

  } catch (error) {
    console.error("Erreur lors de l'ajout des besoins :", error);
    // Traiter les erreurs ici
  }
};


  // Fonction pour fermer la modal de liste d'articles et de catégories
const handleModalClose = () => {
  setIsModalOpen(false);
};

const handleModalCatClose = () => {
  setIsModalCatOpen(false);
};
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  // Fonction pour gérer les changements dans les champs de saisie
  const handleChange = (event) => {
    event.persist();
    setSelectedArticle({ ...selectedArticle, [event.target.name]: event.target.value });
    setSelectedCategorie({ ...selectedCategorie, [event.target.name]: event.target.value });
    setBesoin({...besoin, [event.target.name]: event.target.value})
  };

  // Rendu du composant principal
  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null} onSubmit={handleSubmit}>
          <div className="card center shadow p-5">
            <h1 align="left"> Ajout d'un nouveau Besoin </h1>
            <hr />
            <Grid>
              <TextField
                placeholder="Categorie..."
                label='Catégorie'
                name="LABEL_CAT"
                onChange={handleChange}
                value={selectedCategorie.LABEL_CAT}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                      <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} onClick={handelModalCatOpen}>
                        <FileUploadIcon />
                      </button>
                      <CategorieListModal 
                        onRowCatSelect={handleRowCatSelect}
                        isModalCatOpen={isModalCatOpen} 
                        closeCatModal={handleModalCatClose}
                      />
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
                      <ArticleListModal idCat={idCat} onRowSelect={handleRowSelect} isModalOpen={isModalOpen} closeModal={handleModalClose} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Quantité..."
                type="number"
                label='Quantité'
                name="QUANTITE"
                onChange={handleChange}
                value={besoin.QUANTITE}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                      <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} className="disable">
                        <h6 className="mt-2"> {unite} </h6>
                      </button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <div className="text-start mt-3">
              <button className="btn btn-primary" onClick={handleAddItem}>
                <AddCircleIcon color="white" /> Ajouter
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Numérotation</th>
                    <th>Désignation</th>
                    <th>Catégorie</th>
                    <th>Quantité</th>
                    <th>Unité</th>
                    <th>Opération</th>
                  </tr>
                </thead>
                <tbody>
                  {addedItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.numerotation}</td>
                      <td>{item.designation}</td>
                      <td>{item.categorie}</td>
                      <td>{item.quantite}</td>
                      <td>{item.unite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={articleList.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
            <div className="text-start mt-3">
              <button className="btn btn-success"onClick={handleValidation} >
                <DoneAllIcon color="white" /> Valider
              </button>
            </div>
          </div>
        </ValidatorForm>
      </Container>
    </div>
  );
}

export default NewBesoin;