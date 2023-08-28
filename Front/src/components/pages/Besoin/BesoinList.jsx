import {
Card, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,useTheme,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
//import ModificationArticle from "./ModificationArticle";
//import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../../Utils/ConfirmationDialog";
import { Span } from "../../Typography";


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

  const BesoinList= ({user})=>{

    const [page, setPage] = useState(0);
    const [besoin, setBesoin] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [besoinList, setBesoinList] = useState([]);
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);

    console.log(user)

    const matricule=user[0].MATRICULE;
    const [searchQuery, setSearchQuery] = useState("");


    const filteredBesoinList = besoinList.filter(besoin =>
      besoin.NOM_AG.toLowerCase().includes(searchQuery.toLowerCase()) ||
      besoin.PRENOM_AG.toLowerCase().includes(searchQuery.toLowerCase()) ||
      besoin.LABEL_DIVISION.toLowerCase().includes(searchQuery.toLowerCase()) ||
      besoin.DESIGNATION_ART.toLowerCase().includes(searchQuery.toLowerCase()) ||
      besoin.QUANTITE.toString().includes(searchQuery) ||
      besoin.UNITE.toLowerCase().includes(searchQuery.toLowerCase()) ||
      besoin.ETAT_BESOIN.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          const response = await axios.get(`http://localhost:8080/besoin/${matricule}`);
          setBesoinList(response.data);
          console.log("data loaded", response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const chargerQuantiteAcc = async ()=>{
        try {
          
        } catch (error) {
          console.error(error);
        }
      }

      const handleDelete = id=>{
        axios.delete(`http://localhost:8080/besoin/${id}`).then(reponse=>{
          chargerListBesoin()}).catch (error =>{
          console.error(`Erreur: ${error}`)
    }) 
    }

    useEffect(() => {
        if(matricule) chargerListBesoin();
      }, [matricule]);

      const { palette } = useTheme();
      const bgGreen = "rgba(9, 182, 109, 1)";
      const bgError = palette.error.main;
      const bgwarning = palette.warning.main;

      const renderStatus = (ETAT_BESOIN) => {
        if (ETAT_BESOIN === "Validé") return <StyledSpan bgColor={bgGreen}>{ETAT_BESOIN}</StyledSpan>;
        if (ETAT_BESOIN === "refusé") return <StyledSpan bgColor={bgError}>{ETAT_BESOIN}</StyledSpan>;
        if (ETAT_BESOIN === "En Attente") return <StyledSpan bgColor={bgwarning}>{ETAT_BESOIN}</StyledSpan>;
      };

      const handleChangePage = (_, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      console.log(besoinList);
    


    return (

        <Container className="mt-5">
            <Card sx={{ width: "100%", overflow: "auto" }} elevation={6}>
            <div className="m-5 mt-3 mb-3">
            <div className="d-flex flex-row">
                <h1 align="left" className="me-5"> Besoins </h1>
                <input
                    style={{height:'40px',marginLeft:'60%'}}
                    className="mt-2 form-control"
                    type="text"
                    placeholder="Recherche de besoin..."
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                />
                <button  style={{height:'40px'}} className="btn btn-danger mt-2 ms-2" onClick={() => setSearchQuery("")}>X</button>
              </div>
                <hr />
                
                    <StyledTable>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center"> Nom   </TableCell>
                        <TableCell align="center"> Division </TableCell>
                        <TableCell align="center"> Article </TableCell>
                        <TableCell align="center"> Quantité </TableCell>
                        <TableCell align="center"> Unité </TableCell>
                        <TableCell align="center"> Date </TableCell>
                        <TableCell align="center"> Quantité Accordé </TableCell>
                        <TableCell align="center"> Etat </TableCell>
                    </TableRow>
                      </TableHead>
                    <TableBody>
                        {besoinList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((besoinList) => (
                            <TableRow key={besoinList.NUM_BESOIN}>
                            <TableCell align="center">{besoinList.NOM_AG +" "+ besoinList.PRENOM_AG}</TableCell>
                            <TableCell align="center">{besoinList.LABEL_DIVISION}</TableCell>
                            <TableCell align="center">{besoinList.DESIGNATION_ART}</TableCell>
                            <TableCell align="center">{besoinList.QUANTITE}</TableCell>
                            <TableCell align="center">{besoinList.UNITE}</TableCell>
                            <TableCell align="center">{besoinList.DATE_BESOIN}</TableCell>
                            <TableCell align="center">{besoinList.QUANTITE_ACC}</TableCell>
                            <TableCell align="center">{renderStatus(besoinList.ETAT_BESOIN)}</TableCell>

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

  export default BesoinList;