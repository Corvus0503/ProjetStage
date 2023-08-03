import {
  Card,
  styled,
} from "@mui/material";
import React from "react";
import Breadcrumb from "../../Utils/Breadcrumb";
import ToggleablePills from '../../Utils/ToggleablePills';




const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const Besoin = () => {
  return (
    <Container >
        <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: " Besoin " }]} />
        </div>
        <Card className="shadow" >
            <div className="mt-5">
              <ToggleablePills/>   
            </div>

            
        </Card>        
    </Container>
  )
}
export default Besoin;