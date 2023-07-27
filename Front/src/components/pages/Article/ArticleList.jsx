import React, { useEffect, useState, } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Grid } from "@mui/material";
import { TextValidator , ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";



const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));


//A ne pas toucher
const ArticleList = () => {

    const [selectedArticle, setSelectedArticle] = useState([]);    

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [ArticleListe, setArticleListe] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState({ date: new Date() });

    // const [article,setArticle] = useState({
    //     FORMULE: " ",
    //     DESIGNATION_ART:" ",
    //     SPECIFICITE_ART:" ",
    //     UNITE_ART:" ",
    //     EFFECTIF_ART:" ",
    //     ID_CAT:" ",
    //console.log(selectedArticle)
    // })

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const chargerListArticl = async () => {
    try {
        const response = await axios.get('http://localhost:8080/article');
        setArticleListe(response.data);
    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
        chargerListArticl();
    }, []);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const updateArticle = (id) => {
      try {
        // Convertir les champs numériques en nombres entiers
        const formuleInt = parseInt(selectedArticle.FORMULE, 10);
        const effectifInt = parseInt(selectedArticle.EFFECTIF_ART, 10);
        const idCatInt = parseInt(selectedArticle.ID_CAT, 10);
    
        // Valider si les conversions sont valides
        if (isNaN(formuleInt) || isNaN(effectifInt) || isNaN(idCatInt)) {
          throw new Error("Veuillez saisir des valeurs numériques valides.");
        }
    
        // Faire la requête PUT avec les données correctement formatées
        axios.put(`http://localhost:8080/article/${id}`, {
          ...selectedArticle,
          FORMULE: formuleInt,
          EFFECTIF_ART: effectifInt,
          ID_CAT: idCatInt,
        });
    
        alert("Modifié avec succès");
        console.log(selectedArticle);
      } catch (error) {
        console.log(`Erreur : ${error.message}`);
      }
    };
    
    

    const handleSubmit = async (event, id) => {
      event.preventDefault();
      updateArticle(id);
      alert('modification reussie');
    };
    

    const handleChange = (event) => {
        event.persist();
        setSelectedArticle({ ...selectedArticle, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => setState({ ...state, date });

    const {
        date
    } = state;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(ArticleListe)




  return (
  <div className="container">
      <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left"> N° </TableCell>
            <TableCell align="center"> Categorie  </TableCell>
            <TableCell align="center"> Designation </TableCell>
            <TableCell align="center"> Spécification </TableCell>
            <TableCell align="center"> Effectif </TableCell>
            <TableCell align="center"> Unité </TableCell>
            <TableCell align="left"> Opération </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ArticleListe
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((ArticleListe) => (
              <TableRow key={ArticleListe.FORMULE}>
                <TableCell align="left">{ArticleListe.FORMULE}</TableCell>
                <TableCell align="center">{ArticleListe.LABEL_CAT}</TableCell>
                <TableCell align="center">{ArticleListe.DESIGNATION_ART}</TableCell>
                <TableCell align="center">{ArticleListe.SPECIFICITE_ART}</TableCell>
                <TableCell align="center">{ArticleListe.UNITE_ART}</TableCell>
                <TableCell align="center">{ArticleListe.EFFECTIF_ART}</TableCell>
                <TableCell align="left"  >
                  
                    <button className="btn btn-primary" onClick={() => {
                        setSelectedArticle(ArticleListe);
                        handleShowModal()
                    }}> 
                        + 
                    </button>

                  <IconButton>
                    <Icon color="error"> * </Icon>
                  </IconButton>
                  <IconButton>
                    <Icon color="error"> i </Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={ArticleListe.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>


    {selectedArticle && (
    <Modal show={showModal} animation={true} dialogClassName="modal-lg"  onHide={handleCloseModal}>
      
    <div className="modal-content shadow-lg container "  >

    <Modal.Header closeButton>
        <Modal.Title>Modification d'un Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <ValidatorForm onError={() => null}  >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField
                type="number"
                name="FORMULE"
                label="Formule"
                onChange={handleChange}
                value={selectedArticle.FORMULE}
                validators={["required"]}
                errorMessages={["this field is required"]}
            />
              
              <TextField
                type="text"
                name="DESIGNATION_ART"
                id="standard-basic"
                value={selectedArticle.DESIGNATION_ART}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Désignation"
                validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
              />

              <TextField
                type="text"
                name="SPECIFICITE_ART"
                id="standard-basic"
                value={selectedArticle.SPECIFICITE_ART }
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
                value={selectedArticle.UNITE_ART}
                validators={["required","minStringLength: 1", "maxStringLength: 9"]}
                errorMessages={["this field is required"]}
              />

              <TextField
                type="number"
                name="EFFECTIF_ART"
                label="Effectif"
                onChange={handleChange}
                value={selectedArticle.EFFECTIF_ART}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />  

              <TextField
                type="number"
                name="ID_CAT"
                label="ID Catégorie"
                value={selectedArticle.ID_CAT}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required", "email non valide"]}
              />
            </Grid>
            <button className='btn btn-success m-5 mt-2 mb-3' onClick={() => updateArticle(selectedArticle.FORMULE)} >
              {/*<Icon>send</Icon>*/}
              Modifier
            </button>
          </Grid>
            <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
            </div>
      </ValidatorForm>


      </Modal.Body>

    </div>


    </Modal>
    )}

  </div>
    
  );
};

export default ArticleList;

{/* <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-lg">
  <div className="modal-content shadow-lg">
    {/* Contenu du modal }
  </div>
</Modal> */}


