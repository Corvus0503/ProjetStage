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
import Swal from 'sweetalert2'

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

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
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

const handleSubmit = (id) => {
  Swal.fire({
    title: 'Confirmation',
    text: "Voulez vous vrament modifier vos informations?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Enregistrer'
  }).then((result) => {
    if (result.isConfirmed) {
      updateUser(id)
      Swal.fire(
        'Confirmé!',
        'Inormation modifiés.',
        'success'
      )
    }
  })
  
};

    useEffect(() =>{
      setModUser(user[0])
    }, [])

    console.log("modUser : ",modUser)
    return (
      <Container>
        <Card sx={{ pt: 3 }} elevation={3}>
          <ContentBox mb={3} alignContent="center">
          {user[0].PHOTO && (
                      <img
                        src={require(`../../../uploads/${user[0].PHOTO}`)} // Serve the photo from the "uploads" directory on the server
                        alt={user[0].NOM_AG}
                        style={{width: "150px", height: "150px"}} className="rounded-pill" // Adjust the image size as needed
                      />
                    )}
            <H4 sx={{ mt: "16px", mb: "8px" }}>{user[0].NOM_AG} {user[0].PRENOM_AG}</H4>
            <Small color="text.secondary">{user[0].FONCTION_AG}</Small>
          </ContentBox>
    
          <Divider />
          <ValidatorForm onSubmit={updateUser} onError={() => null}>
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
              type="text"
              name="TEL_AG"
              value={modUser.TEL_AG}
              label="Contact"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />
            <Button onClick={() => handleSubmit(modUser.MATRICULE)} color="success" variant="contained" type="submit">
          {/*<Icon>send</Icon>*/}
          Modifier
        </Button>
    </Grid>
    
</Grid>
</ValidatorForm>
          
    
        </Card>
      </Container>
        
      );
    };
    
export default Profile