import { IconButton, Card, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,useTheme, Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"
import React,{ useEffect } from "react";
//import ModificationArticle from "./ModificationArticle";
// import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumb from "../../Utils/Breadcrumb";
import ConfirmationDialog from "../../Utils/ConfirmationDialog";
import { Span } from "../../Typography";
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import AboutBesoinModal from "./AboutBesoinModal";
import { formatISODateToYYYYMMDD } from "../../Utils/dateUtils";


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
  const StyledSpan = styled(Span)(({ bgColor }) => ({
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "4px",
    background: bgColor,
    textTransform: "capitalize",
  }));

  const BesoinListBag= ()=>{

    const [page, setPage] = useState(0);
    const [besoin, setBesoin] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [besoinList, setBesoinList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
    const [selectedMatricule, setSelectedMatricule] = useState(null);
    const [selectedBesoin, setSelectedBesoin] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
    

    const handleDialogClose = () => {
        setShouldOpenConfirmationDialog(false);
        chargerListBesoin();
      };

      const handleDeleteUser = (besoin) => {
        setBesoin(besoin);
        setShouldOpenConfirmationDialog(true);
      };

      const handleConfirmationResponse = () => {
        handleDelete(besoin)
        handleDialogClose()
      };

      const chargerListBesoin = async () => {
        try {
          const response = await axios.get('http://localhost:8080/besoinBag');
          setBesoinList(response.data);
          console.log("data loaded", response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const handleDelete = id=>{
        axios.delete(`http://localhost:8080/besoin/${id}`).then(reponse=>{
          chargerListBesoin()}).catch (error =>{
          console.error(`Erreur: ${error}`)
    }) 
    }

    useEffect(() => {
        chargerListBesoin();
      }, []);

      const { palette } = useTheme();
      const bgError = palette.error.main;
      const renderStatus = (BESOIN_COUNT) => {
        return <StyledSpan bgColor={bgError}>{BESOIN_COUNT}</StyledSpan>;
      };

      const handleChangePage = (_, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      console.log(besoinList);

    const handleModalOpen = (matricule) => {
    setSelectedMatricule(matricule);    
    // Utilisez la fonction de formatage de date ici

    setIsModalOpen(true);
    console.log("Matricule sélectionné :", matricule);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
 


    return (

        <Container className="mt-5">
          <div className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: " Liste des Besoins " }]} />
          </div>
            <Card sx={{ width: "100%", overflow: "auto" }} elevation={6} className="mt-5">
            <div className="m-5 mt-3 mb-3">
              <h1 align="left"> Liste de tous les Besoins </h1>
                <hr />
                
                    <StyledTable >
                    <TableHead>
                    <TableRow>
                          <TableCell align="center"> Matricule </TableCell>
                          <TableCell align="center"> Nom   </TableCell>
                          <TableCell align="center"> Prénom</TableCell>
                          <TableCell align="center"> Division </TableCell>
                          <TableCell align="center"> Date de Besoin </TableCell>
                          <TableCell align="center"> Nombre des Besoins </TableCell>
                          <TableCell align="center"> Opération </TableCell>

                          </TableRow>
                      </TableHead>
                    <TableBody>
                        {besoinList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((besoinList) => (
                            <TableRow key={besoinList.NUM_BESOIN}>
                            <TableCell align="center">{besoinList.AGENT_MATRICULE}</TableCell>
                            <TableCell align="center">{besoinList.AGENT_NOM}</TableCell>
                            <TableCell align="center">{besoinList.AGENT_PRENOM}</TableCell>
                            <TableCell align="center">{besoinList.LABEL_DIVISION}</TableCell>
                            <TableCell align="center">{besoinList.DATE_BESOIN}</TableCell>
                            <TableCell align="center">{renderStatus(besoinList.BESOIN_COUNT)}</TableCell>
                            <TableCell align="center">
                            <Button onClick={() => handleModalOpen(besoinList.AGENT_MATRICULE)}>
                              <InfoIcon color="warning" />
                            </Button>
                            <AboutBesoinModal
                              matricule={selectedMatricule}                           
                              isModalOpen={isModalOpen}
                              closeModal={handleModalClose}
                              chargerBag={chargerListBesoin}
                            />
                                <Button> <CheckCircleOutlineIcon color="success"/> </Button>
                                <Button> <CancelIcon color="error"/> </Button>
                            </TableCell>

                            {/* <TableCell align="left"  >                               
                                
                                
                                
                                {/* <IconButton >
                                <ModificationArticle  besoinList={besoinList} besoinList={BesoinList}  chargerListBesoin={chargerListBesoin} />
                                </IconButton> }
                                

                                <IconButton onClick={()=>handleDeleteUser(besoinList.NUM_BESOIN)}>
                                <DeleteIcon color="error"/>
                                </IconButton>
                            </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                    </StyledTable>

                    <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={besoinList.length}
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
        
    )

  }

  export default BesoinListBag;