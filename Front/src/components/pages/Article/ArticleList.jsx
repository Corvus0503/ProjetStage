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
import ModificationArticle from "./ModificationArticle";

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
const ArticleList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ArticleListe, setArticleListe] = useState([]);

const chargerListAdmin = async () => {
  try {
    const response = await axios.get('http://localhost:8080/article');
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
            .map((List) => (
              <TableRow key={ArticleListe.FORMULE}>
                <TableCell align="left">{List.FORMULE}</TableCell>
                <TableCell align="center">{List.LABEL_CAT}</TableCell>
                <TableCell align="center">{List.DESIGNATION_ART}</TableCell>
                <TableCell align="center">{List.SPECIFICITE_ART}</TableCell>
                <TableCell align="center">{List.EFFECTIF_ART}</TableCell>
                <TableCell align="center">{List.UNITE_ART}</TableCell>

                <TableCell align="left"  >
                  
                    <button className="btn btn-primary" > <ModificationArticle  List={List} ArticleList={ArticleList}  chargerListAdmin={chargerListAdmin} /> </button>

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
    
  </div>
    
  );
};

export default ArticleList;