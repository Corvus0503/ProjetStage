import React from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Select,
  MenuItem,
  InputLabel,
  Switch
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios"
import Swal from 'sweetalert2'
import { Box } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

function getSteps() {
  return ["Info Perso", "Fonction", "Securité"];
}




const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: "100%",
  marginBottom: "13px",
}));

const suggestions = [
  {label : "Admin"},
  {label : "AG"},
  {label : "User"}
]

const PhotoUploadButton = styled('label')(({ backgroundImage }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #ccc',
  borderRadius: '50%',
  width: '150px',
  height: '150px',
  cursor: 'pointer',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  '&:hover': {
    backgroundColor: '#f2f2f2',
  },
}));

const PhotoInputLabel = styled('span')({
  textAlign: 'center',
  fontSize: '16px',
  color: '#555',
  padding: '8px',
  cursor: 'pointer',
});

const Signup = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);


  const [confirmMdp, setConfirmMdp] = useState("")
  const [newUser, setNewUser] = useState({
    MATRICULE: "",
    FONCTION_AG: "",
    MAIL_AG: "",
    NOM_AG: "",
    NOM_UTIL_AG: "",
    TYPE_AG: "User",
    PRENOM_AG: "",
    ADRESSE_AG: "",
    TEL_AG: "",
    PASSWORD: "",
    PHOTO: null,
    GENRE: "",
    ACTIVATION: "",
    CODE_DIVISION: "",
})

const addNewUser = async () => {
  try {
    const formDataToSend = new FormData();
    for (const key in newUser) {
      formDataToSend.append(key, newUser[key]);
    }

      await axios.post("http://localhost:8080/admin/newUser", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    setNewUser({
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
      CODE_DIVISION: "",
    });
    console.log('Le USer a été ajouté avec succès.');
  } catch (error) {
    console.error(error);
  }
};


    const [state, setState] = useState({
      date: new Date(),
      password: "",
      confirmPassword: "", // Add confirmPassword to form state
    });

// ...

useEffect(() => {
  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== newUser.PASSWORD) return false;
    return true;
  });
  return () => ValidatorForm.removeValidationRule("isPasswordMatch");
}, [newUser.PASSWORD]);


  const handleSubmit = (event) => {
    console.log(newUser)
    Swal.fire({
      title: 'Confirmation',
      text: "Voulez vous enregister cet utilisateur ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enregistrer'
    }).then((result) => {
      if (result.isConfirmed) {
        addNewUser()
        Swal.fire(
          'Confirmé!',
          'Utilisateur enregistré.',
          'success'
        )
      }
    })
    
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleChangeComp = (event, newValue) => {
    setNewUser({
      ...newUser,
      [event.target.name]: newValue.label,
    });
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewUser({ ...newUser, PHOTO: file });

    // Display selected image in the button
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const inoPerso = (<div>
    <Grid container spacing={6}>
    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
            type="text"
            name="NOM_AG"
            label="Nom"
            onChange={handleChange}
            value={newUser.NOM_AG}
            validators={["required"]}
            errorMessages={["Veuillez remplir ce champ"]}
          />
          
          <TextField
            type="text"
            name="PRENOM_AG"
            label="Prenom"
            onChange={handleChange}
            value={newUser.PRENOM_AG}
            validators={["required"]}
            errorMessages={["Veuillez remplir ce champ"]}
          />

          <TextField
              type="text"
              name="NOM_UTIL_AG"
              //id="standard-basic"
              value={newUser.NOM_UTIL_AG}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Nom d'utilisteur"
              validators={["required", "minStringLength: 1", "maxStringLength: 20"]}
            />
            <RadioGroup
              row
              name="GENRE"
              sx={{ mb: 2 }}
              value={newUser.GENRE}
              onChange={handleChange}
            >
              <FormControlLabel
                value="M"
                label="Homme"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="F"
                label="Femme"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

            </RadioGroup>
    </Grid>
    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
    <TextField
              type="email"
              name="MAIL_AG"
              label="Email"
              value={newUser.MAIL_AG}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email non valide"]}
            />
            <TextField
                type="text"
                name="ADRESSE_AG"
                label="Adresse"
                onChange={handleChange}
                value={newUser.ADRESSE_AG}
                errorMessages={["Veuillez remplir ce champ"]}
                validators={["required"]}
              />

            <TextField
              type="number"
              name="TEL_AG"
              value={newUser.TEL_AG}
              label="Contact"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />
    </Grid>
</Grid>
    
    
          
  </div>
  )

  const fonction =(<div>
    <TextField
              type="text"
              name="MATRICULE"
              value={newUser.MATRICULE}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Matricule"
              validators={["required", "minStringLength: 6", "maxStringLength: 6"]}
            />

            <TextField
              type="number"
              name="CODE_DIVISION"
              value={newUser.CODE_DIVISION}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Code division"
              validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="FONCTION_AG"
              //id="standard-basic"
              value={newUser.FONCTION_AG}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Fonction"
              validators={["required", "minStringLength: 4", "maxStringLength: 20"]}
              required
            />

            <AutoComplete
                  options={suggestions}
                  getOptionLabel={(option) => option.label}
                  value={{ label: newUser.TYPE_AG }} // Set value as an object with label property
                  onChange={handleChangeComp}
                  name="TYPE_AG"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
  </div>)

  const securité = (<div>
    <TextField
              name="PASSWORD"
              type="password"
              label="Password"
              value={newUser.PASSWORD}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={(e) => setConfirmMdp(e.target.value)}
              value={confirmMdp}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["this field is required", "password didn't match"]}
            />
<FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={newUser.ACTIVATION === 'Activé'}
                onChange={handleChange}
                name="ACTIVATION"
                value={newUser.ACTIVATION === 'Activé' ? 'Desactivé' : 'Activé'}
              />
            }
            label={newUser.ACTIVATION === 'Activé' ? 'Activé' : 'Desactivé'}
            labelPlacement="end"
          />
  </div>)

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<div>{inoPerso}</div>)
  
      case 1:
        return (<div>{fonction}</div>)
  
      case 2:
        return (<div>{securité}</div>)
  
      default:
        return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
    }
  }

  return (
    <div className="container mt-5 p-5 card shadow">
      {/*<ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              name="PHOTO"
              onChange={handleFileChange}
            />
            <PhotoUploadButton htmlFor="raised-button-file" backgroundImage={imagePreview}>
              {imagePreview ? null : <Icon fontSize="large">cloud_upload</Icon>}
            </PhotoUploadButton>
          
          <TextField
              type="text"
              name="MATRICULE"
              value={newUser.MATRICULE}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Matricule"
              validators={["required", "minStringLength: 6", "maxStringLength: 6"]}
            />

            <TextField
              type="number"
              name="CODE_DIVISION"
              value={newUser.CODE_DIVISION}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Code division"
              validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="FONCTION_AG"
              //id="standard-basic"
              value={newUser.FONCTION_AG}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Fonction"
              validators={["required", "minStringLength: 4", "maxStringLength: 20"]}
              required
            />

            <AutoComplete
                  options={suggestions}
                  getOptionLabel={(option) => option.label}
                  value={{ label: newUser.TYPE_AG }} // Set value as an object with label property
                  onChange={handleChangeComp}
                  name="TYPE_AG"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />


            <TextField
              type="text"
              name="NOM_AG"
              label="Nom"
              onChange={handleChange}
              value={newUser.NOM_AG}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />

            <TextField
              type="text"
              name="PRENOM_AG"
              label="Prenom"
              onChange={handleChange}
              value={newUser.PRENOM_AG}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />  

          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextField
              type="text"
              name="NOM_UTIL_AG"
              //id="standard-basic"
              value={newUser.NOM_UTIL_AG}
              onChange={handleChange}
              errorMessages={["Veuillez remplir ce champ"]}
              label="Nom d'utilisteur"
              validators={["required", "minStringLength: 1", "maxStringLength: 20"]}
            />
          <TextField
              type="email"
              name="MAIL_AG"
              label="Email"
              value={newUser.MAIL_AG}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email non valide"]}
            />
            <TextField
                type="text"
                name="ADRESSE_AG"
                label="Adresse"
                onChange={handleChange}
                value={newUser.ADRESSE_AG}
                errorMessages={["Veuillez remplir ce champ"]}
                validators={["required"]}
              />

            <TextField
              type="number"
              name="TEL_AG"
              value={newUser.TEL_AG}
              label="Contact"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />

            <TextField
              name="PASSWORD"
              type="password"
              label="Password"
              value={newUser.PASSWORD}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Veuillez remplir ce champ"]}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              onChange={(e) => setConfirmMdp(e.target.value)}
              value={confirmMdp}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["this field is required", "password didn't match"]}
            />
            <RadioGroup
              row
              name="GENRE"
              sx={{ mb: 2 }}
              value={newUser.GENRE}
              onChange={handleChange}
            >
              <FormControlLabel
                value="M"
                label="Homme"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="F"
                label="Femme"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

            </RadioGroup>
            <FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={newUser.ACTIVATION === 'Activé'}
                onChange={handleChange}
                name="ACTIVATION"
                value={newUser.ACTIVATION === 'Activé' ? 'Desactivé' : 'Activé'}
              />
            }
            label={newUser.ACTIVATION === 'Activé' ? 'Activé' : 'Desactivé'}
            labelPlacement="end"
          />
          </Grid>
        </Grid>

        <Button onClick={handleSubmit} color="primary" variant="contained" type="submit">
          {/*<Icon>send</Icon>
          Enregister
        </Button>
      </ValidatorForm>*/}

      <Box>
      <h1 align="left"> Nouvel utilisateur </h1>
          <hr />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed</Typography>

            <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Typography>{getStepContent(activeStep)}</Typography>
            </ValidatorForm>
            

            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              
                {activeStep === steps.length - 1 ? <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleSubmit}>Enregister</Button> : <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleNext}>Suivant</Button>}
             
            </Box>
          </Box>
        )}
      </Box>
    </Box>
    </div>
  );
};

export default Signup;
