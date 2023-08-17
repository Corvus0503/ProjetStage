import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import  LocalizationProvider  from '@mui/x-date-pickers/LocalizationProvider'
import {
  Button,
  Grid,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Breadcrumb from "../../Utils/Breadcrumb";
import { Modal} from '@mui/material';

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


const NewDivision = ({ isOpen, onClose }) => {
  const [state, setState] = useState({ date: new Date() });

  const [division,setDivision] = useState({
    CODE_DIVISION:"",
    CODE_SER:"",
    LABEL_DIVISION:""
  })



  const addNewDivision = async()=>{
    try {
        await axios.post(`http://localhost:8080/division`, division)


    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {

    console.log(division)
    addNewDivision();
    setDivision({
      CODE_DIVISION:"",
      CODE_SER:"",
      LABEL_DIVISION:""      
    })
  };

  

  const handleChange = (event) => {
    event.persist();
    setDivision({ ...division, [event.target.name]: event.target.value });
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
              <ValidatorForm onError={() => null} onSubmit={handleSubmit} >
                  <div className=" card center shadow p-5">
                  <h1 align="left"> Ajout d'un nouveau Division </h1>
                  <hr />
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        
                      <TextField
                          type="text"
                          name="CODE_DIVISION"
                          label="Code Division"
                          placeholder="Saisir ici le code de division...."
                          onChange={handleChange}
                          value={division.CODE_DIVISION}
                          validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                          errorMessages={["this field is required"]}
                        />              

                        <TextField
                          type="text"
                          name="CODE_SER"
                          id="standard-basic"
                          placeholder="Saisir ici le code de Service...."
                          value={division.CODE_SER}
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          label="Code Service"
                          validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
                        />

                        <TextField
                          type="text"
                          name="LABEL_DIVISION"
                          id="standard-basic"
                          value={division.LABEL_DIVISION }
                          onChange={handleChange}
                          errorMessages={["this field is required"]}
                          placeholder="Saisir ici le nom de Division...."
                          label="Libellé"
                          validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
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

                        <Button color="primary" className="me-2 "  variant="outlined" type="submit">
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
