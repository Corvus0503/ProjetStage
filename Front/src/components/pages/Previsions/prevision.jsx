import React, { useEffect, useRef, useState } from "react";
import LogoMinister from '../../images/LogoMinister';
import {
    styled,
  } from "@mui/material";
import axios from "axios"
import Breadcrumb from "../../Utils/Breadcrumb";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import * as XLSX from "xlsx";
import html2canvas from "html2canvas"; // pour l'exportation au format PDF
import jsPDF from "jspdf";
import './Prevision.css'
import PageVide from "./PageVide";
import Swal from 'sweetalert2';
import PrintIcon from '@mui/icons-material/Print';
import { format } from 'date-fns';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));



const Previsions = (user) =>{
    
    const [validationEntete,setValidationEntete]=useState([]);
    const [validationList, setValidationList] = useState([]);
    const [isButtonValidated, setIsButtonValidated] = useState(false);
    const [PrevisionBudgetaire, setPrevisionBudgetaire] = useState([{
        PREVISION: '', // Use the PREVISION value from Prix
        DATE_PREVISION: '',
    }]);
    const [isLoading, setIsLoading] = useState(true);
    const [prix,setPrix]=useState([{
        PREVISION : " ",
    }])
    const [validation, setValidation] = useState([{
        LIBELLE:"",
        ENTETE1:"",
        ENTETE2:"",
        ENTETE3:"",
        ENTETE4:"",
        ENTETE5:"",
        SIGLE:"",
        VILLE:"",
        ADRESSE:"",
        CONTACT:"",
        EMAIL:"",
        LABEL_DIVISION:"",
        PRIX_ART:"",
        OBSERVATION:"",
    }])

    const handlePrint = () => {
        const printContent = document.getElementById("impression");
        if (printContent) {
            const pdf = new jsPDF("p", "mm", "a4");
            
            // Définir la largeur souhaitée de l'image dans le PDF (en mm)
            const imgWidth = 205;
            
            html2canvas(printContent).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                
                // Calculer la hauteur en fonction du rapport d'aspect
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                pdf.addImage(imgData, "PNG", 2, 15, imgWidth, imgHeight); // Utiliser les dimensions calculées
                pdf.save("budget_previsionnel.pdf");
            });
        }
    };
    const handleExportExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById("table"));

        XLSX.utils.book_append_sheet(wb, ws, "Budget_Previsionnel");
        XLSX.writeFile(wb, "budget_previsionnel.xlsx");
    };

    const fetchValidation = async () => {
        try {
            const response = await axios.get('http://localhost:8080/validationList');
            setValidationList(response.data);
        } catch (error) {
            console.error(error);
        }
    }; 

    const chargeListValidation = async()=>{
        try {
            const response=await axios.get('http://localhost:8080/validation')
            setValidation(response.data)
            setValidationEntete(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const chargerPrix = async()=>{
        try {
            const response = await axios.get('http://localhost:8080/prixTotal')
            setPrix(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const PASSWORD = user.user[0].PASSWORD;
    const typeCompte =user.user[0].TYPE_AG;

    const Prix = prix.length >0 ?{
        PREVISION : prix[0].PREVISION,
    } : {
        PREVISION : " ",
    }
    const Data = validation.length > 0 ? {
        LIBELLE: validation[0].LIBELLE,
        ENTETE1: validation[0].ENTETE1,
        ENTETE2: validation[0].ENTETE2,
        ENTETE3: validation[0].ENTETE3,
        ENTETE4: validation[0].ENTETE4,
        ENTETE5: validation[0].ENTETE5,
        SIGLE: validation[0].SIGLE,
        VILLE: validation[0].VILLE,
        ADRESSE: validation[0].ADRESSE,
        CONTACT: validation[0].CONTACT,
        EMAIL: validation[0].EMAIL,
        LABEL_DIVISION: validation[0].LABEL_DIVISION,
        PRIX_ART: validation[0].PRIX_ART,
        OBSERVATION: validation[0].OBSERVATION,
    } : {
        LIBELLE: "",
        ENTETE1: "",
        ENTETE2: "",
        ENTETE3: "",
        ENTETE4: "",
        ENTETE5: "",
        SIGLE: "",
        VILLE: "",
        ADRESSE: "",
        CONTACT: "",
        EMAIL: "",
        LABEL_DIVISION: "",
        PRIX_ART: "",
        OBSERVATION: "",
    };
    const addPrevision = async () => {
        try {
            const response = await axios.post('http://localhost:8080/prevision', {
                PREVISION: Prix.PREVISION, // Use the PREVISION value from Prix
                DATE_PREVISION: format(new Date(), 'yyyy-MM-dd'), // Current date as validation date
            });
            setPrevisionBudgetaire(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        chargeListValidation();
        chargerPrix();
        fetchValidation().then(() => {
            setIsLoading(false);
        });
    }, []);
    useEffect(() => {
        const savedIsButtonValidated = localStorage.getItem('isButtonValidated');
        if (savedIsButtonValidated === 'true') {
            setIsButtonValidated(true);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('isButtonValidated', isButtonValidated);
    }, [isButtonValidated]);

    const [currentYear] = useState(new Date().getFullYear());

    return(
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: " Prevision Budgetaire " }]} />
            </div >        
            <div className="shadow p-3 custom-bg" id="impression">
                <div className="custom-logo-container">
                    <LogoMinister />
                </div>
                {isLoading ? (
                    <div>Chargement en cours...</div>
                ) : validationList.length > 0 ? (
                <div className="custom-flex-container">
                    <div className="custom-text-container" style={{ float: 'left' }}>
                        <div className="custom-flex-column">
                            <span className="custom-h5">{Data.ENTETE1}</span>
                            <span className="custom-uppercase">{Data.ENTETE2}</span>
                            <span className="custom-uppercase">{Data.ENTETE3}</span>
                            <span className="custom-text">{Data.ENTETE4}</span>
                            <span className="custom-text">{Data.ENTETE5}</span>
                        </div>
                    </div>
                    <div className="custom-table-responsive">
                        
                        <div className="custom-table-responsive">
                            <table id="table" className="custom-table">
                                <thead>
                                    <tr> 
                                        <td colSpan={'5'} >
                                        <div className="custom-h3">
                                            Budget Prévisionnel Année {currentYear + 1}
                                        </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="center">SOA CODE</th>
                                        <th align="center">SOA</th>
                                        <th align="center">PCOP</th>
                                        <th align="center">Désigantion Compte</th>
                                        <th align="center">Prix Total(Ariary) </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {validationList.map((Liste) => (
                                        <tr key={Liste.NUM_Liste}>
                                            <td align="center">{Liste.CODE_SER}</td>
                                            <td align="center">{Liste.LIBELLE}</td>
                                            <td align="center">{Liste.NUM_CMPT}</td>
                                            <td align="center">{Liste.DESIGNATION_CMPT}</td>
                                            <td align="center">{Liste.TOTAL}</td>
                                        </tr>
                                    ))}
                                        <tr>  
                                            <th > Total = </th>
                                            <td colSpan={'3'}> </td>
                                            <td  align="left">{Prix.PREVISION}</td>
                                        </tr>
                                </tbody>
 
                            </table>
                        </div>
                    </div>
                </div>
                ) : (
                    <div> <PageVide/> </div>
                )}
            </div>

            <div className="text-start mt-3">
                {typeCompte === "Admin" && (
                    <button
                        className="btn btn-primary ms-3 me-3"
                        onClick={() => {
                            Swal.fire({
                                title: `Attention ! Si vous le validez maintenant, la prévision de l'année ${currentYear + 1} sera confirmée et vous ne pourrez plus apporter de modifications. `,
                                input: 'password',
                                inputPlaceholder: 'Mot de passe',
                                showCancelButton: true,
                                confirmButtonText: 'Valider',
                                cancelButtonText: 'Annuler',
                                html: `
                                <div class="text-center" >
                                <p class="h4"> Pour Confirmer Saisir votre mot de passe </p>
                                </div>
                            `,
                                allowOutsideClick: false,
                                inputValidator: (value) => {
                                    if (!value) {
                                        return 'Veuillez entrer le mot de passe';
                                    }
                                },
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    if (result.value === PASSWORD) {
                                        setIsButtonValidated(true);
                                        addPrevision();
                                    } else {
                                        Swal.fire('Mot de passe incorrect', 'Veuillez réessayer.', 'error');
                                    }
                                }
                            });
                        }}
                        disabled={isButtonValidated || validationList.length === 0}
                    >
                        {isButtonValidated ? (
                            <span>
                                <DoneAllIcon style={{ color: 'white' }} /> Validé
                            </span>
                        ) : (
                            'Valider'
                        )}
                    </button>
                )}
                {typeCompte === "Admin" && (
                    <button
                        className="btn btn-danger ps-3 pe-3"
                        onClick={handlePrint}
                        disabled={validationList.length === 0}
                    >
                        <PrintIcon color="white" /> Export PDF
                    </button>
                )}

                {typeCompte === "Admin" && (
                    <button
                        className="btn btn-success ms-3"
                        onClick={handleExportExcel}
                        disabled={validationList.length === 0}
                    >
                       <PrintIcon color="white" /> Export Excel
                    </button>
                )}
            </div>
        </Container>
    ) 
}

export default Previsions