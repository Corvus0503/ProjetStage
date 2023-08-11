import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import {
  Button,
  Grid,
  styled,
  InputAdornment
} from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Breadcrumb from "../../Utils/Breadcrumb";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Modal} from '@mui/material';
import Swal from 'sweetalert2'
import CompteListModal from "./ListeCompte";

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


const NewCategorie = ({ isOpen, onClose, chargerListAdmin }) => {
  const [state, setState] = useState({ date: new Date() });

  const [categorie,setCategorie] = useState({
      LABEL_CAT: "",
      NUM_CMPT: "" 
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompte, setSelectedCompte] = useState({
      NUM_CMPT: "",
      DESIGNATION_CMPT: "",
    });

    console.log("selected : ",selectedCompte)
  
    const handleRowSelect = (selectedRow) => {
      setSelectedCompte(selectedRow);
    };

    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const addNewCategorie = async()=>{

    let catToSend = {
      LABEL_CAT: categorie.LABEL_CAT,
      NUM_CMPT: selectedCompte.NUM_CMPT}
    console.log(catToSend)
    try {
        await axios.post(`http://localhost:8080/categorie`, catToSend)
        chargerListAdmin()
    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {

    onClose();
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez vous enregister cette categorie ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Enregistrer'
    }).then((result) => {
      if (result.isConfirmed) {
        addNewCategorie();
        Swal.fire(
          'Confirmé!',
          'Categorie enregistré.',
          'success'
        )
      }
    })
    
    setCategorie({
      LABEL_CAT: "",
      NUM_CMPT: ""    
    })
  };

  

  const handleChange = (event) => {
    event.persist();
    setSelectedCompte({ ...selectedCompte, [event.target.name]: event.target.value });
    setCategorie({ ...categorie, [event.target.name]: event.target.value });
    console.log(event.target.value)
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    date
  } = state;

  const handleCloseModal = () => {
    onClose();
  };

  return (

    <CustomModal open={isOpen} onClose={onClose}>
        <Container>            
              <ValidatorForm onError={() => null} >
                  <div className=" card center shadow p-5">
                  <h1 align="left"> Ajout d'une nouvelle categorie </h1>
                  <hr />
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                              

                        <TextField
                          type="text"
                          name="LABEL_CAT"
                          id="standard-basic"
                          placeholder="Saisir ici le label categorie...."
                          value={categorie.LABEL_CAT}
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          label="Label Categorie"
                          validators={["required", "minStringLength: 1", "maxStringLength: 40"]}
                        />

                        {/*<TextField
                          type="text"
                          name="NUM_CMPT"
                          id="standard-basic"
                          value={categorie.NUM_CMPT }
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          placeholder="Saisir ici le numero de compte...."
                          label="Num Compte"
                          validators={["required", "minStringLength: 1", "maxStringLength: 40"]}
  />*/}

                        <TextField
                          placeholder="Compte..."
                          label="Article"
                          name="NUM_CMPT"
                          onChange={handleChange}
                          value={selectedCompte.NUM_CMPT}
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

export default NewCategorie;
