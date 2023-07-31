import React, { useState } from "react";
import {
     styled
  } from "@mui/material";
import Breadcrumb from "../../Utils/Breadcrumb";

const Dashboard = ({user}) => {

    const Container = styled("div")(({ theme }) => ({
        margin: "30px",
        [theme.breakpoints.down("sm")]: { margin: "16px" },
        "& .breadcrumb": {
          marginBottom: "30px",
          [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
        },
      }));
    
    return(
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: " Dashboard " }]} />
            </div>
            <h1>Bienvenue </h1>
        </Container>
    )
}

export default Dashboard