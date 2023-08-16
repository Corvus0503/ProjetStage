import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../Utils/Breadcrumb";
import LogoMinister from '../../images/LogoMinister';
import {
    styled,
  } from "@mui/material";
import Previsions from "./prevision";
import PageVide from "./PageVide";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const PagePrevision = () => {
  return (
    <Container>
        <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: " Prevision Budgetaire " }]} />
        </div >
        <PageVide/>
        <Previsions/>
    </Container>
  )
}

export default PagePrevision;