import {
  IconButton, Card, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
//import ModificationArticle from "./ModificationArticle";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "../../Utils/ConfirmationDialog";

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

const BesoinEnAttent = () => {
  const [page, setPage] = useState(0);
  const [besoin, setBesoin] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [besoinList, setBesoinList] = useState([]);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
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
      const response = await axios.get('http://localhost:8080/besoinAtt');
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
      <h1 align="left"> Liste des Besoins en Attente </h1>
        <hr />
        
            <StyledTable>
            <TableHead>
            <TableRow>
                <TableCell align="left"> Nummérotation </TableCell>
                <TableCell align="center"> Categorie  </TableCell>
                <TableCell align="center"> Designation </TableCell>
                <TableCell align="center"> Spécification </TableCell>
                <TableCell align="center"> Quantité </TableCell>
                <TableCell align="center"> Unité </TableCell>
                <TableCell align="center"> Etat de Besoin </TableCell>
                <TableCell align="left"> Option </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {besoinList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((besoinList) => (
                    <TableRow key={besoinList.NUM_BESOIN}>
                    <TableCell align="left">{besoinList.NUM_BESOIN}</TableCell>
                    <TableCell align="center">{besoinList.LABEL_CAT}</TableCell>
                    <TableCell align="center">{besoinList.DESIGNATION_ART}</TableCell>
                    <TableCell align="center">{besoinList.SPECIFICITE_ART}</TableCell>
                    <TableCell align="center">{besoinList.QUANTITE}</TableCell>
                    <TableCell align="center">{besoinList.UNITE}</TableCell>
                    <TableCell align="center">{besoinList.ETAT_BESOIN}</TableCell>

                    <TableCell align="left"  >                               
                        
                        
                        
                        {/* <IconButton >
                        <ModificationArticle  besoinList={besoinList} besoinList={BesoinList}  chargerListBesoin={chargerListBesoin} />
                        </IconButton> */}
                        

                        <IconButton onClick={()=>handleDeleteUser(besoinList.NUM_BESOIN)}>
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

export default BesoinEnAttent;