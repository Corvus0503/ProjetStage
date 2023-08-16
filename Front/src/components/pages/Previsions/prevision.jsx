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


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));



const Previsions = () =>{
    const [isLoading, setIsLoading] = useState(true);
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
    const [validationEntete,setValidationEntete]=useState([]);
    const [validationList, setValidationList] = useState([]);

    const handlePrint = () => {
        const printContent = document.getElementById("impression");
        if (printContent) {
            html2canvas(printContent).then((canvas) => {
                const pdf = new jsPDF("p", "mm", "a4");
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = 210; // Largeur en mm (format A4)
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculer la hauteur en fonction du rapport d'aspect
                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Utiliser les dimensions calculées
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
            console.log("Validation list:", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const chargeListValidation = async()=>{
        try {
            const response=await axios.get('http://localhost:8080/validation')
            setValidation(response.data)
            console.log("data loaded");
            setValidationEntete(response.data)
            console.log(validationEntete)
            console.log("data loaded:",response.data);
        } catch (error) {
            console.error(error);
        }
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
    useEffect(() => {
        chargeListValidation();
        fetchValidation().then(() => {
            setIsLoading(false);
        });
    }, []);

    const [currentYear] = useState(new Date().getFullYear());

    return(
        <Container className="mt-5">
          
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
                        <div className="custom-h3">
                            Budget Prévisionnel Année {currentYear + 1}
                        </div>
                        <div className="custom-table-responsive">
                            <table id="table" className="custom-table">
                                <thead>
                                    <tr>
                                        <th align="center">SOA CODE</th>
                                        <th align="center">SOA</th>
                                        <th align="center">PCOP</th>
                                        <th align="center">Désigantion Compte</th>
                                        <th align="center">Prix Total</th>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                ) : (
                    <div>Aucune donnée disponible.</div>
                )}
            </div>

            <div className="text-start mt-3">
                <button className="btn btn-success" onClick={handlePrint} disabled={validationList.length === 0}>
                    <DoneAllIcon color="white" /> Imprimer
                </button>
                <button className="btn btn-primary ms-3" onClick={handleExportExcel} disabled={validationList.length === 0}>
                    Export Excel
                </button>
            </div>
        </Container>
    ) 
}

export default Previsions