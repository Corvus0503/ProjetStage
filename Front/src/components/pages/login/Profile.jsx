import React from 'react'
import { LockOpen, Person } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { FlexBetween, FlexBox } from "../../FlexBox";
import { H4, Small } from "../../Typography";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormControl,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Switch
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Modal } from 'react-bootstrap';
import axios from "axios"
import CreateIcon from '@mui/icons-material/Create';

const ContentBox = styled(FlexBox)({
  alignItems: "center",
  flexDirection: "column",
});

const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const StyedSmall = styled(Small)({
  color: "#08ad6c",
  padding: "2px 4px",
  borderRadius: "4px",
  background: "rgba(9, 182, 109, 0.15)",
});

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.text.primary,
  ":hover": { background: "transparent" },
}));

const Profile = ({user}) => {

  const [modUser, setModUser] = useState({
    MATRICULE: "",
    FONCTION_AG: "",
    MAIL_AG: "",
    NOM_AG: "",
    NOM_UTIL_AG: "",
    TYPE_AG: "user",
    PRENOM_AG: "",
    ADRESSE_AG: "",
    TEL_AG: "",
    PASSWORD: "",
    PHOTO: null,
    GENRE: "",
    ACTIVATION: "",
    CODE_DIVISION: ""
})

const handleChange = (e) => {
  setModUser({ ...modUser, [e.target.name]: e.target.value });
};

const updateUser = id => {
  const formDataToSend = new FormData();
    for (const key in modUser) {
      formDataToSend.append(key, modUser[key]);
    }
  axios.put(`http://localhost:8080/admin/${id}`, formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => {
    setModUser({
      MATRICULE: "",
      FONCTION_AG: "",
      MAIL_AG: "",
      NOM_AG: "",
      NOM_UTIL_AG: "",
      TYPE_AG: "",
      PRENOM_AG: "",
      ADRESSE_AG: "",
      TEL_AG: "",
      PASSWORD: "",
      PHOTO: null,
      GENRE: "",
      ACTIVATION: "",
      CODE_DIVISION: ""
    });
    console.log('Le USer a été ajouté avec succès.');
  }).catch(error =>{console.error(error);})
}

    useEffect(() =>{
      setModUser(user[0])
    }, [])

    console.log(user[0].PHOTO)
    return (
        <Card sx={{ pt: 3 }} elevation={3}>
          <ContentBox mb={3} alignContent="center">
            <H4 sx={{ mt: "16px", mb: "8px" }}>{user[0].NOM_AG} {user[0].PRENOM_AG}</H4>
            <Small color="text.secondary">{user[0].FONCTION_AG}</Small>
          </ContentBox>
    
          <Divider />
          <ValidatorForm onError={() => null}>
          <Grid container spacing={6}>
    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
            type="text"
            name="NOM_AG"
            label="Nom"
            onChange={handleChange}
            value={modUser.NOM_AG}
            validators={["required"]}
            errorMessages={["Veuillez remplir ce champ"]}
          />
          
          <TextField
            type="text"
            name="PRENOM_AG"
            label="Prenom"
            onChange={handleChange}
            value={modUser.PRENOM_AG}
            validators={["required"]}
            errorMessages={["Veuillez remplir ce champ"]}
          />

          <TextField
              type="text"
              name="NOM_UTIL_AG"
              //id="standard-basic"
              value={modUser.NOM_UTIL_AG}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Nom d'utilisteur"
              validators={["required", "minStringLength: 1", "maxStringLength: 20"]}
            />

<Button onClick={() => updateUser(modUser.MATRICULE)} color="success" variant="contained" type="submit">
          {/*<Icon>send</Icon>*/}
          Modifier
        </Button>

    </Grid>
    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
    <TextField
              type="email"
              name="MAIL_AG"
              label="Email"
              value={modUser.MAIL_AG}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email non valide"]}
            />
            <TextField
                type="text"
                name="ADRESSE_AG"
                label="Adresse"
                onChange={handleChange}
                value={modUser.ADRESSE_AG}
                errorMessages={["Veuillez remplir ce champ"]}
                validators={["required"]}
              />

            <TextField
              type="number"
              name="TEL_AG"
              value={modUser.TEL_AG}
              label="Contact"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />
    </Grid>
    
</Grid>
</ValidatorForm>
          
    
        </Card>
      );
    };
    
export default Profile