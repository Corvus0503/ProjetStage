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

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const Article = () => {
  const [state, setState] = useState({ date: new Date() });

  const [article,setArticle] = useState({
    FORMULE: " ",
    DESIGNATION_ART:" ",
    SPECIFICITE_ART:" ",
    UNITE_ART:" ",
    EFFECTIF_ART:" ",
    ID_CAT:" ",
  })



  const addNewArticle = async()=>{
    try {
        await axios.post(`http://localhost:8080/article`, article)
        alert("submited")


    } catch (error) {
        console.log(`Erreur : ${error}`)
    }
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(article)
    addNewArticle();
  };

  const handleChange = (event) => {
    event.persist();
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    date
  } = state;
  


  return (
    <div className=" container  ">

        
      <ValidatorForm onError={() => null} onSubmit={handleSubmit} >
        <div className="container card center shadow mt-4 p-5">
        <h1 align="left"> Ajout d'un nouveau Article </h1>
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
            <Button color="primary" className=" m-5 mb-2 mt-2" variant="contained" type="submit" >
              {/*<Icon>send</Icon>*/}
              Enregister
            </Button>
          </Grid>
        </div>

      </ValidatorForm>
    </div>
  );
};

export default Article;
