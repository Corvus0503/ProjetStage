import {
  Button,
  Grid,
  styled,
  InputAdornment,
} from "@mui/material";
import Swal from 'sweetalert2'
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ServiceListModal from "./ListeService";


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


const NewDivision = ({ isOpen, onClose,ChargeTable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [division,setDivision] = useState({
    CODE_DIVISION:"",
    CODE_SER:"",
    LABEL_DIVISION:""
  })



  const addNewDivision = async()=>{
    let divToSend = {
      CODE_SER:selectedService.CODE_SER,
      CODE_DIVISION: division.CODE_DIVISION,
      LABEL_DIVISION: division.LABEL_DIVISION,
    }
    try {
      console.log(divToSend)
        await axios.post(`http://localhost:8080/division`, divToSend)
        ChargeTable();
    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher la soumission du formulaire

    if(!division.CODE_DIVISION || !selectedService.CODE_SER || !division.LABEL_DIVISION){
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
      text: "Voulez vous enregister cette categorie ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Enregistrer'
    }).then((result) => {
      if (result.isConfirmed) {
        addNewDivision();
        Swal.fire(
          'Confirmé!',
          'Categorie enregistré.',
          'success'
        )
        setDivision({
          CODE_DIVISION:"",
          CODE_SER:"",
          LABEL_DIVISION:""      
        })
      }
    })
  };

  const [selectedService, setSelectedService] = useState({
    CODE_SER: "",
    LIBELLE: "",
  });
  const handleRowSelect = (selectedRow) => {
    setSelectedService(selectedRow);
  };

  const handleChange = (event) => {
    event.persist();
    setDivision({ ...division, [event.target.name]: event.target.value });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
const handleModalClose = () => {
  setIsModalOpen(false);
};

  const handleCloseModal = () => {
    onClose();
  };
  const handleSubmited = ()=>{
    console.log('test');
  }
  return (

    <CustomModal open={isOpen} onClose={onClose}>
        <Container>            
              <ValidatorForm onError={() => null} onSubmit={handleSubmited} >
                  <div className=" card center shadow p-5">
                  <h1 align="left"> Ajout d'un nouveau Division </h1>
                  <hr />
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                          type="text"
                          name="LIBELLE"
                          id="standard-basic"
                          placeholder="Saisir ici le code de Service...."
                          value={selectedService.LIBELLE}
                          onChange={handleChange}
                          label="Code Service"
                          validators={["required", "minStringLength: 1", "maxStringLength: 20"]}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <h1 style={{border:"none",color:'SlateBlue',backgroundColor:"white"}}>|</h1>
                                <button style={{border:"none",color:'SlateBlue',backgroundColor:"white"}} onClick={handleModalOpen}>
                                  <FileUploadIcon style={{fontSize:'2.5rem'}} />
                                </button>
                                <ServiceListModal  onRowSelect={handleRowSelect} isModalOpen={isModalOpen} closeModal={handleModalClose} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      <TextField
                          type="text"
                          name="CODE_DIVISION"
                          label="Code Division"
                          placeholder="Saisir ici le code de division...."
                          onChange={handleChange}
                          value={division.CODE_DIVISION}
                        />

                        <TextField
                          type="text"
                          name="LABEL_DIVISION"
                          id="standard-basic"
                          value={division.LABEL_DIVISION}
                          onChange={handleChange}
                          placeholder="Saisir ici le nom de Division...."
                          label="Libellé"
                        />

                        <div className="text-center">

                        <Button color="primary" className="me-2 "  variant="outlined"onClick={handleSubmit} >
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

export default NewDivision;
