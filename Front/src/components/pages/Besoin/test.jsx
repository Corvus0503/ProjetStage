import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ArticleListModal from "./ListeArticle";
const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  return (
    <>
      {/* Display the selected row data in TextField */}
      {selectedRow && (
        <TextField
          placeholder="Article..."
          label="Article"
          name=""
          value={selectedRow.FORMULE} // Replace with the appropriate property for the "Article" field
          // onChange={handleChange}
          // validators={["required", "minStringLength: 1"]}
          // errorMessages={['Vous devez remplir ce Champs']}
          disabled // To prevent editing of the selected row data
        />
      )}

      <Button onClick={handleModalOpen}>Open Article List Modal</Button>
      <ArticleListModal
        isModalOpen={isModalOpen}
        closeModal={handleModalClose}
        onRowSelect={handleRowSelect} // Pass the callback to the ArticleListModal
      />
    </>
  );
};

export default ParentComponent;
