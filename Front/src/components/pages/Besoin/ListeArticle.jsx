import {
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import { useState } from "react";
  import axios from "axios";
  import { React, useEffect } from "react";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';//join files2
  
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
  
  const ArticleListModal = ({ isModalOpen, closeModal , onRowSelect }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ArticleListe, setArticleListe] = useState([]);
  

    const [selectedRow, setSelectedRow] = useState(null);

    const handleSelectRow = (row) => {
      setSelectedRow(row);
      onRowSelect(row); // Call the onRowSelect callback to pass the selected row data to the parent component
    };
  
    const chargerListAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:8080/article");
        setArticleListe(response.data);
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
  
    return (
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="article-list-dialog"
        fullWidth // To make the dialog take the full width of the screen
        maxWidth="md"
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Customize the shadow properties here
        }} 
      >
        <DialogTitle id="article-list-dialog">Liste des Articles</DialogTitle>
        <DialogContent>
          <Container>
              <div className="m-5 mt-3 mb-3">
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"> N° </TableCell>
                      <TableCell align="center"> Categorie </TableCell>
                      <TableCell align="center"> Designation </TableCell>
                      <TableCell align="center"> Spécification </TableCell>
                      <TableCell align="center"> Effectif </TableCell>
                      <TableCell align="center"> Unité </TableCell>
                      <TableCell align="center"> Opération </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ArticleListe.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    ).map((List) => (
                      <TableRow key={ArticleListe.FORMULE}>
                        <TableCell align="left">{List.FORMULE}</TableCell>
                        <TableCell align="center">{List.LABEL_CAT}</TableCell>
                        <TableCell align="center">
                          {List.DESIGNATION_ART}
                        </TableCell>
                        <TableCell align="center">
                          {List.SPECIFICITE_ART}
                        </TableCell>
                        <TableCell align="center">
                          {List.EFFECTIF_ART}
                        </TableCell>
                        <TableCell align="center">{List.UNITE_ART}</TableCell>
  
                        <TableCell align="center">
                          {/* <IconButton>
                            <ModificationArticle
                              List={List}
                              ArticleList={ArticleListe}
                              chargerListAdmin={chargerListAdmin}
                            />
                          </IconButton> */}
  
                         <IconButton onClick={() => handleSelectRow(List)}>
                          <DriveFileMoveIcon color="primary" />
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
                  className="mt-5"
                />
              </div>
              <input type="text" name="test" className="form-control" />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ArticleListModal;


  /**
   * // ... (previous imports)

const ArticleListModal = ({ isModalOpen, closeModal, onRowSelect }) => {
  // ... (previous state and functions)

  const handleSelectRow = (row) => {
    onRowSelect(row); // Pass the entire row object to the onRowSelect callback
  };

  // ... (rest of the component)

  return (
    // ... (dialog content)
  );
};

export default ArticleListModal;

   */
  