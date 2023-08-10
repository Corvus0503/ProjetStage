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
  useTheme,
} from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
import TestModal from "./TestModal";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../Utils/ConfirmationDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumb from "../../Utils/Breadcrumb";
import Swal from 'sweetalert2'
import { Span } from "../../Typography";

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

//A ne pas toucher
const UserList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [adminList, setAdminList] = useState([]);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);

const chargerListAdmin = async () => {
  try {
    const response = await axios.get('http://localhost:8080/admin/userList');
    setAdminList(response.data);
    console.log("data loaded");
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = id => {
  axios.delete(`http://localhost:8080/admin/${id}`).then(response => {
    chargerListAdmin()
    console.log('Le USer a été supprimé avec succès.');
  }).catch(error =>{console.error(error);})
}

useEffect(() => {
  chargerListAdmin();
}, []);

const { palette } = useTheme();
const bgGreen = "rgba(9, 182, 109, 1)";
const bgError = palette.error.main;
const bgSecondary = palette.secondary.main;

const renderStatus = (status) => {
  if (status === "Activé") return <StyledSpan bgColor={bgGreen}>{status}</StyledSpan>;
  if (status === "Desactivé") return <StyledSpan bgColor={bgError}>{status}</StyledSpan>;
};

const handleDeleteUser = (user) => {
  setUser(user);
  Swal.fire({
    title: 'Confirmation',
    text: "Etes vous dur de supprimer cet utilisateur ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Supprimer'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(user)
      Swal.fire(
        'Supprimé!',
        'Utilisateur supprimeé.',
        'success'
      )
    }
  })
};

const handleConfirmationResponse = () => {
  deleteUser(user)
  handleDialogClose()
};

const handleDialogClose = () => {
  //setShouldOpenEditorDialog(false);
  setShouldOpenConfirmationDialog(false);
  chargerListAdmin();
};

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderImage = (photoBlob) => {
    if(!photoBlob){
      return null
    }

    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(photoBlob)
    })
  }


  console.log(adminList)
  return (
  <div>
    <div className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Liste des Utilisateur" }]} />
      </div>
      <div className="mt-5 p-5 card shadow">
        <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Nom d'utilisateur</TableCell>
              <TableCell align="center">Matricule</TableCell>
              <TableCell align="center">Fonction</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Activation</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((List) => (

                <TableRow key={List.MATRICULE}>
                  <TableCell>{List.PHOTO && (
                    <img
                      src={require(`../../../uploads/${List.PHOTO}`)} // Serve the photo from the "uploads" directory on the server
                      alt={List.NOM_AG}
                      style={{width: "40px", height: "40px"}} className="rounded-pill" // Adjust the image size as needed
                    />
                  )}</TableCell>
                  <TableCell align="center">{List.NOM_UTIL_AG}</TableCell>
                  <TableCell align="center">{List.MATRICULE}</TableCell>
                  <TableCell align="center">{List.FONCTION_AG}</TableCell>
                  <TableCell align="center">{List.TEL_AG}</TableCell>
                  <TableCell align="center">{renderStatus(List.ACTIVATION)}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <TestModal List={List} adminList={adminList} chargerListAdmin={chargerListAdmin}/>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(List.MATRICULE)}>
                      
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
          count={adminList.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
        {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              text="Voulez vous supprimer cet utilisateur?"
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={handleDialogClose}
              onYesClick={handleConfirmationResponse}
            />
          )}
        </Box>
      </div>
    
  </div>
    
  );
};

export default UserList;