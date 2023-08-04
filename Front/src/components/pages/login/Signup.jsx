import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
  InputLabel
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios"

const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: "80%",
  marginBottom: "13px",
}));

const suggestions = [
  {label : "Admin"},
  {label : "AG"},
  {label : "User"}
]

const Signup = () => {
  const [confirmMdp, setConfirmMdp] = useState("")
  const [newUser, setNewUser] = useState({
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
    GENRE: "",
    ACTIVATION: "",
    CODE_DIVISION: "",
    photo: null
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
      GENRE: "",
      ACTIVATION: "",
      CODE_DIVISION: "",
      photo: null
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
    if (value !== state.password) return false;
    return true;
  });
  return () => ValidatorForm.removeValidationRule("isPasswordMatch");
}, [state.password]);


  const handleSubmit = (event) => {
    console.log(newUser)
    addNewUser()
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewUser({ ...newUser, photo: file })
  };

  const handleDateChange = (date) => setState({ ...state, date });


  return (
    <div className="container mt-5 p-5 card shadow">
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            name='photo'
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload
            </Button>
          </label> 
          
          <TextField
              type="text"
              name="MATRICULE"
              value={newUser.MATRICULE}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Matricule"
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="CODE_DIVISION"
              value={newUser.CODE_DIVISION}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Code division"
              validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="FONCTION_AG"
              //id="standard-basic"
              value={newUser.FONCTION_AG}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Fonction"
              validators={["required", "minStringLength: 4", "maxStringLength: 20"]}
            />

            <AutoComplete
                options={suggestions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} value={newUser.TYPE_AG}
                  onChange={handleChange} name="TYPE_AG" label="Type" variant="outlined" fullWidth />
                )}
              />


            <TextField
              type="text"
              name="NOM_UTIL_AG"
              //id="standard-basic"
              value={newUser.NOM_UTIL_AG}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Nom d'utilisteur"
              validators={["required", "minStringLength: 1", "maxStringLength: 9"]}
            />

            <TextField
              type="text"
              name="NOM_AG"
              label="Nom"
              onChange={handleChange}
              value={newUser.NOM_AG}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="PRENOM_AG"
              label="Prenom"
              onChange={handleChange}
              value={newUser.PRENOM_AG}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />  

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
                errorMessages={["this field is required"]}
                validators={["required"]}
              />

            <TextField
              type="text"
              name="TEL_AG"
              value={newUser.TEL_AG}
              label="Contact"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              name="PASSWORD"
              type="password"
              label="Password"
              value={newUser.PASSWORD}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
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
            <RadioGroup
              row
              name="ACTIVATION"
              sx={{ mb: 2 }}
              value={newUser.ACTIVATION}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Activé"
                label="Activé"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Desactivé"
                label="Desactivé"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

            </RadioGroup>
          </Grid>
        </Grid>

        <Button onClick={handleSubmit} color="primary" variant="contained" type="submit">
          {/*<Icon>send</Icon>*/}
          Enregister
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Signup;
