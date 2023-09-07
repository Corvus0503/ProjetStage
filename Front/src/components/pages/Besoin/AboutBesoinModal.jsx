import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, DialogTitle, DialogContent, DialogActions, Button, } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

//


// Composant pour afficher la liste des articles dans une modal



const AboutBesoinModal = ({ matricule,isModalOpen, closeModal, chargerBag, user}) => {
  // Utilisation de useState pour gérer la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [besoinList, setBesoinList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const fetchArticleList = async () => {
    try {
      // Vérifiez que user existe et a les propriétés nécessaires
      if (matricule) {

        const response = await axios.get(`http://localhost:8080/besoinDetail/${matricule}`);
        setBesoinList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const filteredBesoinList = besoinList.filter(besoin =>
  //   besoin.DESIGNATION_CMPT.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   besoin.DESIGNATION_ART.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   besoin.LABEL_DIVISION.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   besoin.NUM_CMPT.includes(searchQuery) ||
  //   besoin.UNITE.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   besoin.DATE_BESOIN.includes(searchQuery)
  // );

  //console.log(matricule)

  async function sendComment() { 
    console.log('matricule : ',matricule) 
    try { 
      await axios.post(`http://localhost:8080/notificationRet`, { 
        BODY_NOT : `a analysé votre beson`, 
        MATRICULE : `${user[0].MATRICULE}`, 
        DATE_NOT : format(new Date(), 'yyyy-MM-dd'), 
        MATR_DEST: matricule }) } 
        catch (error) { 
          console.log(`Erreur : ${error}`) 
        } }

  // Utilisation de useEffect pour charger la liste des articles lorsque l'idCat change
  useEffect(() => {  
    fetchArticleList();
  }, [matricule]);

  console.log(besoinList)

  const handleValidation = async (besoinId) => {
    const besoinToUpdate = besoinList.find(besoin => besoin.NUM_BESOIN === besoinId);
    
    try {
      
      // Créez un nouvel objet de mise à jour en incluant tous les champs nécessaires

      closeModal();
  
      // Demande de confirmation avec SweetAlert2
      const result = await Swal.fire({
        title: 'Êtes-vous sûr de vouloir valider ce besoin ?',
        text: "Cette action ne peut pas être annulée !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, valider',
        cancelButtonText: 'Annuler'
      });

      if (result.isConfirmed) {
        const { value: quantiteAcc } = await Swal.fire({
          title: 'Saisissez la quantité accordée :',
          input: 'number',
          inputAttributes: {
            step: '1',
            min: '0',
          },
          showCancelButton: true,
          confirmButtonText: 'Valider',
          cancelButtonText: 'Annuler',
          html: `
            <div class="text-center" >
              <p class="h4">Quantité demandée : <span class="badge rounded-pill bg-danger">${besoinToUpdate.QUANTITE} </span> </p>
            </div>
          `,
          inputValidator: (value) => {
            if (!value) {
              return 'Vous devez saisir une quantité !';
            }
            if (parseInt(value) > besoinToUpdate.QUANTITE) {
              return 'La quantité accordée ne peut pas être supérieure à la quantité demandée !';
            }
            if (parseInt(value) < 0) {
              return 'La quantité accordée ne peut pas être négative !';
            }
          }
        });
  
        if (quantiteAcc !== undefined) {
          const DataValidated = {
            NUM_BESOIN: besoinId,
            DATE_VALIDATION:format(new Date(), 'yyyy-MM-dd'),
            QUANTITE_ACC: parseInt(quantiteAcc),
          };
          const updatedBesoin = {
            MATRICULE: besoinToUpdate.MATRICULE,
            FORMULE: besoinToUpdate.FORMULE,
            DATE_BESOIN: besoinToUpdate.DATE_BESOIN,
            QUANTITE: besoinToUpdate.QUANTITE,
            UNITE: besoinToUpdate.UNITE,
            ETAT_BESOIN: 'Validé', // Nouvel état
            QUANTITE_ACC: parseInt(quantiteAcc),
          };

          // Ajout des données à la table VALIDATION
          await axios.post(`http://localhost:8080/validation`, DataValidated);

          // Mise à jour du besoin dans la table principale
          await axios.put(`http://localhost:8080/besoins/${besoinId}`, updatedBesoin);  
          // Mettez à jour la liste des besoins avec le nouvel état
          setBesoinList(prevList =>
            prevList.map(besoin => {
              if (besoin.NUM_BESOIN === besoinId) {
                return { ...besoin, ETAT_BESOIN: 'Valider' };
              }
              return besoin;
            })
          );
          Swal.fire(
            'Validé !',
            'Le besoin a été validé avec succès.',
            'success'
          );
          sendComment();
          fetchArticleList();
          chargerBag();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (besoinId, newEtat) => {
    const besoinToUpdate = besoinList.find(besoin => besoin.NUM_BESOIN === besoinId);
  
    try {  
      // Créez un nouvel objet de mise à jour en incluant tous les champs nécessaires
      const updatedBesoin = {
        MATRICULE: besoinToUpdate.MATRICULE,
        FORMULE: besoinToUpdate.FORMULE,
        DATE_BESOIN: besoinToUpdate.DATE_BESOIN,
        QUANTITE: besoinToUpdate.QUANTITE,
        QUANTITE_ACC:0,
        UNITE: besoinToUpdate.UNITE,
        ETAT_BESOIN: newEtat, // Nouvel état
      };

      closeModal();
  
      // Demande de confirmation avec SweetAlert2
      const result = await Swal.fire({
        title: 'Êtes-vous sûr de vouloir refuser ce besoin ?',
        text: "Cette action ne peut pas être annulée !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, refuser',
        cancelButtonText: 'Annuler'
      });
      
      if (result.isConfirmed) {
        // Envoyez une requête au serveur pour mettre à jour le besoin avec les nouvelles données
        await axios.put(`http://localhost:8080/besoins/${besoinId}`, updatedBesoin);
  
        // Mettez à jour la liste des besoins avec le nouvel état
        setBesoinList(prevList =>
          prevList.map(besoin => {
            if (besoin.NUM_BESOIN === besoinId ) {
              return { ...besoin, ETAT_BESOIN: newEtat };
            }
            return besoin;
          })
        );

        Swal.fire(
          'Refusé !',
          'Besoin refusé.',
          'success'
        );
        
        sendComment();
        fetchArticleList();
        chargerBag();

      }
    } catch (error) {
      console.error(error);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////////
  
  

  // Fonction pour gérer le changement de page
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Fonction pour gérer le changement du nombre de lignes par page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Rendu du composant de la modal
  return (
    <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle><span className="h4">Validations des Besoin</span> <hr /></DialogTitle>
      <DialogContent>
      <div className="d-flex flex-row">
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

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"> Division </TableCell>
              <TableCell align="center"> Compte </TableCell>
              <TableCell align="center"> Article </TableCell>
              <TableCell align="center"> Quantité </TableCell>
              <TableCell align="center"> Unité </TableCell>
              <TableCell align="center"> Date </TableCell>
              <TableCell align="center"> Observation </TableCell>
              <TableCell align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Opération</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {besoinList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((besoinList) => (
                <TableRow key={besoinList.NUM_BESOIN}>
                <TableCell align="center">{besoinList.LABEL_DIVISION}</TableCell>
                <TableCell align="center">{besoinList.DESIGNATION_CMPT +besoinList.NUM_CMPT }</TableCell>
                <TableCell align="center">{besoinList.DESIGNATION_ART}</TableCell>
                <TableCell align="center">{besoinList.QUANTITE}</TableCell>
                <TableCell align="center">{besoinList.UNITE}</TableCell>
                <TableCell align="center">{besoinList.DATE_BESOIN}</TableCell>
                <TableCell align="center">{besoinList.OBSERVATION}</TableCell>
                <TableCell align="center" className="d-flex inline">
                <Button onClick={() => handleValidation(besoinList.NUM_BESOIN)}>
                  <CheckCircleIcon color="success"/>
                </Button>
                <Button onClick={() => handleUpdate(besoinList.NUM_BESOIN, 'refusé')}>
                  <CancelIcon color="error"/>
                </Button>

                </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={besoinList.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 15, 25]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="warning">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutBesoinModal;