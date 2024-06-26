import {
  IconButton,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  alpha,
  InputBase
} from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
import ConfirmationDialog from "../../Utils/ConfirmationDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumb from "../../Utils/Breadcrumb";
import UpdateDivision from "./UpdateDivision";
import NewDivision from "./NewDivision";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  borderColor: 'black',
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

//A ne pas toucher
const Division = () => {
  const [page, setPage] = useState(0);
  const [division, setDivision] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [DivisionListe, setDivisionList] = useState([]);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);

  const [isModalOuverte, setIsModalOuverte] = useState(false);

  const ouvrirModal = () => {
    setIsModalOuverte(true);
  };

  const fermerModal = () => {
    setIsModalOuverte(false);
  };


  const handleDialogClose = () => {
    setShouldOpenConfirmationDialog(false);
    chargerListAdmin();
  };

  const handleDeleteUser = (division) => {
    setDivision(division);
    setShouldOpenConfirmationDialog(true);
  };

  const handleConfirmationResponse = () => {
    handleDelete(division)
    handleDialogClose()
  };



const chargerListAdmin = async () => {
  try {
    const response = await axios.get('http://localhost:8080/division');
    setDivisionList(response.data);
    console.log("data loaded");
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = id=>{
    axios.delete(`http://localhost:8080/division/${id}`).then(reponse=>{
      chargerListAdmin();
      Swal.fire(
        'Confirmé!',
        'Division supprimé.',
        'success'
      )
    }).catch (error =>{
      console.error(`Erreur: ${error}`)
}) 
}

useEffect(() => {
  chargerListAdmin();
}, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(DivisionListe)

  const [searchTerm, setSearchTerm] = useState("");

  // Filter the DivisionListe based on the search term
  const filteredDivisionList = DivisionListe.filter(
    (item) =>
      item.CODE_DIVISION.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.LABEL_DIVISION.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.LIBELLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.VILLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ADRESSE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CONTACT.includes(searchTerm)
  );

  return (
    <Container>
        <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Liste des Division" }]} />
        </div>
        <div className=" text-start mb-3">
          <button className="btn btn-primary " onClick={ouvrirModal} > <AddCircleIcon/> Nouveau Division </button>
          <NewDivision isOpen={isModalOuverte} onClose={fermerModal} />
        </div>
            <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
            <div className="m-5 mt-3 mb-3">
              <h1 align="left"> Liste des Division </h1>
                <hr />
                <div style={{paddingLeft: "80%"}}>
          <div style={{width: "200px", right: 0}} className="text-end">
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </Search>
          </div>
          </div>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                            <TableCell align="left"> Code Division </TableCell>
                            <TableCell align="center"> Label de Division  </TableCell>
                            <TableCell align="center"> Libellé de Service </TableCell>
                            <TableCell align="center"> Ville de Service </TableCell>
                            <TableCell align="center"> Adresse de Service</TableCell>
                            <TableCell align="center"> contact de Service</TableCell>
                            <TableCell align="center"> Opération </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDivisionList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((List) => (
                                <TableRow key={DivisionListe.CODE_DIVISION}>
                                    <TableCell align="left">{List.CODE_DIVISION}</TableCell>
                                    <TableCell align="center">{List.LABEL_DIVISION}</TableCell>
                                    <TableCell align="center">{List.LIBELLE}</TableCell>
                                    <TableCell align="center">{List.VILLE}</TableCell>
                                    <TableCell align="center">{List.ADRESSE}</TableCell>
                                    <TableCell align="center">{List.CONTACT}</TableCell>
                                    <TableCell align="center"  >

                                        
                                    <IconButton >
                                        <UpdateDivision  List={List} DivisionListe={DivisionListe}  chargerListAdmin={chargerListAdmin} />
                                    </IconButton>

                                    <IconButton onClick={()=>handleDeleteUser(List.CODE_DIVISION)}>
                                        <DeleteIcon color="error"/>
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
                    count={DivisionListe.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                    className="mt-5"
                    />

                    {shouldOpenConfirmationDialog && (
                        <ConfirmationDialog
                        text="Voulez vous Supprimer ?"
                        open={shouldOpenConfirmationDialog}
                        onConfirmDialogClose={handleDialogClose}
                        onYesClick={handleConfirmationResponse}
                        />
                    )}
                </div>
            </Card>
    </Container>

    
  );
};

export default Division;