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
import { useState } from "react";
import axios from "axios"
import { React, useEffect } from "react";
  
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
  const UserList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [adminList, setAdminList] = useState([]);

  const chargerListAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/userList');
      setAdminList(response.data);
      console.log("data loaded");
    } catch (error) {
      console.error(error);
    }
  };

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
    console.log(adminList)
    return (
    <div className="container">
        <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Matricule</TableCell>
              <TableCell align="center">Nom d'utilisateur</TableCell>
              <TableCell align="center">Fonction</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Activation</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((adminList) => (
                <TableRow key={adminList.MATRICULE}>
                  <TableCell align="left">{adminList.MATRICULE}</TableCell>
                  <TableCell align="center">{adminList.NOM_UTIL_AG}</TableCell>
                  <TableCell align="center">{adminList.FONCTION_AG}</TableCell>
                  <TableCell align="center">{adminList.TEL_AG}</TableCell>
                  <TableCell align="center">{adminList.ACTIVATION}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Icon color="error"></Icon>
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
      </Box>
    </div>
      
    );
  };
  
  export default UserList;