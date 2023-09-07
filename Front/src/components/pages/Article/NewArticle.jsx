import InputAdornment from "@material-ui/core/InputAdornment";
import FileUploadIcon from '@mui/icons-material/FileUpload';
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import { Grid, styled } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import CompteListModal from "../Categorie/ListeCompte";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategorieListModal from "./CategorieArticleModale.jsx";
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';


const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "15px",
  textAlign:"start"
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Article = () => {
    // const [state, setState] = useState({ date: new Date() });
    const [isModalCatOpen,setIsModalCatOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [article, setArticle] = useState({
        DESIGNATION_ART: " ",
        SPECIFICITE_ART: " ",
        PRIX_ART: " ",
        UNITE_ART:" ",
        DATE_MODIFICATION:' ',
    });

    const [idCompte, setIdCompte] = useState("");
    const [selectedCategorie, setSelectedCategorie] = useState({
        ID_CAT: "",
        LABEL_CAT: "",
      });
        

    const [selectedCompte, setSelectedCompte] = useState({
        NUM_CMPT: " ",
        DESIGNATION_CMPT: " ",
        });
    const handleRowCatSelect = (selectedCatRow) => {
        setSelectedCategorie(selectedCatRow);
      };

    
    const handleRowSelect = (selectedRow) => {
    setSelectedCompte(selectedRow);
    setIdCompte(selectedRow.NUM_CMPT);

    };
    console.log(idCompte)

    const handleModalOpen = () => {
    setIsModalOpen(true);
        };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handelModalCatOpen =()=>{
        setIsModalCatOpen(true);
    }
    const handleModalCatClose = () => {
        setIsModalCatOpen(false);
      };

    const addNewArticle = async () => {
        try {

            if (!article.DESIGNATION_ART || !selectedCategorie.ID_CAT || !article.UNITE_ART || !article.PRIX_ART || !article.SPECIFICITE_ART) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Champs vides',
                    text: 'Veuillez remplir tous les champs obligatoires.',
                });
                return;
            }    
                const Categorie = selectedCategorie.ID_CAT;
                const Unite = article.UNITE_ART;
                const Designation = article.DESIGNATION_ART;
                const Prix = article.PRIX_ART;
                const Specification = article.SPECIFICITE_ART;
                console.log(Unite);
                console.log(Categorie)
                console.log(Designation)
                console.log(Prix)
                console.log(Specification)
                const response = await axios.post(`http://localhost:8080/article`, {
                    ID_CAT: Categorie, // Assurez-vous que le nom de champ est correct (peut-être ID_CAT au lieu de Categorie)
                    UNITE_ART: Unite,
                    DESIGNATION_ART: Designation,
                    PRIX_ART: Prix,
                    SPECIFICITE_ART: Specification
                });
                console.log('Article ajouter avec succes:', response.data);
                await Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Article ajouté avec succès',
                });
        
                // Vider les champs après la soumission
                setSelectedCompte(" ")
                setSelectedCategorie(" ")
                setArticle({
                    DESIGNATION_ART: "",
                    SPECIFICITE_ART: "",
                    PRIX_ART: "",
                    UNITE_ART: "",
                    Categorie:" "
                });

                } catch (error) {
                console.log(`Erreur : ${error}`);
                }
            };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addNewArticle();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === "DESIGNATION_CMPT") {
            setSelectedCompte(prevSelectedCompte => ({
                ...prevSelectedCompte,
                DESIGNATION_CMPT: value // Correction : Mettre à jour le champ DESIGNATION_CMPT
            }));
        } else if (name === "LABEL_CAT") {
            setSelectedCategorie(prevSelectedCategorie => ({
                ...prevSelectedCategorie,
                LABEL_CAT: value // Correction : Mettre à jour le champ LABEL_CAT
            }));
        } else if (name === "UNITE_ART") {
            setArticle(prevArticle => ({
                ...prevArticle,
                UNITE_ART: value // Correction : Mettre à jour le champ UNITE_ART
            }));
        } else {
            setArticle({ ...article, [name]: value });
        }
    };
    

    const handleSubmit1 = async (event) => {
        event.preventDefault();
      };

    // const handleDateChange = (date) => setState({ ...state, date });

    // const { date } = state;

    return (
        <Container>
        <ValidatorForm onError={() => null} onSubmit={handleSubmit1}>
            <div className=" card center shadow p-5">
            <h1 align="left"> Ajout d'un nouveau Article </h1>
            <hr />
            <Grid>

                <TextField
                    placeholder="Compte..."
                        label="Compte"
                        name="DESIGNATION_CMPT"
                        onChange={handleChange}
                        value={selectedCompte.DESIGNATION_CMPT}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                                <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} onClick={handleModalOpen}>
                                <FileUploadIcon />
                                </button>
                                <CompteListModal  onRowSelect={handleRowSelect} isModalOpen={isModalOpen} closeModal={handleModalClose} />
                            </InputAdornment>
                        ),
                    }}
                />

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
                            idCompte={idCompte}
                        />
                        </InputAdornment>
                    ),
                    }}
                />

                <TextField
                    type="text"
                    name="DESIGNATION_ART"
                    id="standard-basic"
                    value={article.DESIGNATION_ART}
                    onChange={handleChange}
                    label="Désignation"
                    validators={[
                        "required",
                        "minStringLength: 1",
                        "maxStringLength: 20",
                    ]}
                    errorMessages={'Cette champs est vide '}
                />

                <TextField
                    type="text"
                    name="SPECIFICITE_ART"
                    id="standard-basic"
                    value={article.SPECIFICITE_ART}
                    onChange={handleChange}
                    label="Spécification"
                    validators={[
                        "required",
                        "minStringLength: 1",
                        "maxStringLength: 20",
                    ]}
                    errorMessages={'Cette champs est vide '}
                />

                <TextField
                    type="number"
                    name="PRIX_ART"
                    label="Prix Unitaire"
                    onChange={handleChange}
                    value={article.PRIX_ART}
                    validators={[
                        "required",
                        "minStringLength: 1",
                        "maxStringLength: 20",
                    ]}
                    errorMessages={'Cette champs est vide '}
                />

                <TextField
                    select
                    name="UNITE_ART"
                    label="Unité"
                    textAlign='start'
                    onChange={handleChange}
                    value={article.UNITE_ART}
                >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                    {/* Ajoutez d'autres options selon vos besoins */}
                </TextField>

            </Grid>

            <div className="text-start mt-3">
                <button className="btn btn-primary" onClick={handleSubmit} >
                   <AddCircleIcon color="white" />
                    Enregister
                </button>
            </div>

            </div>
        </ValidatorForm>
        </Container>
    );
    };

export default Article;