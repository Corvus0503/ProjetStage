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
}));


const NewDivision = () => {
  const [state, setState] = useState({ date: new Date() });

  const [division,setDivision] = useState({
    CODE_DIVISION:"",
    CODE_SER:"",
    LABEL_DIVISION:""
  })



  const addNewDivision = async()=>{
    try {
        await axios.post(`http://localhost:8080/division`, division)
        alert("submited")


    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(division)
    addNewDivision();
  };

  const handleChange = (event) => {
    event.persist();
    setDivision({ ...division, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    date
  } = state;
  


  return (

    <Container>
      <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Liste des Division" }]} />
        </div>

      <ValidatorForm onError={() => null} onSubmit={handleSubmit} >
          <div className=" card center shadow p-5">
          <h1 align="left"> Ajout d'un nouveau Division </h1>
          <hr />
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                
              <TextField
                  type="text"
                  name="CODE_DIVISION"
                  label="Unité"
                  onChange={handleChange}
                  value={division.CODE_DIVISION}
                  validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                  errorMessages={["this field is required"]}
                />              

                <TextField
                  type="text"
                  name="CODE_SER"
                  id="standard-basic"
                  value={division.CODE_SER}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Désignation"
                  validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                />

                <TextField
                  type="text"
                  name="LABEL_DIVISION"
                  id="standard-basic"
                  value={division.LABEL_DIVISION }
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Spécification"
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

              <div className="text-start">
                <Button color="primary" className=" m-5 mb-2 mt-2 " variant="contained" type="submit" >
                    {/*<Icon>send</Icon>*/}
                    Enregister
                </Button>
              </div>
            </Grid>
          </div>

      </ValidatorForm>

    </Container>
    
  );
};

export default NewDivision;
