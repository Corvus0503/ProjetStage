import {
  Card,
  styled,
} from "@mui/material";
import React from "react";
import Breadcrumb from "../../Utils/Breadcrumb";
import TooglepillArticle from '../../Utils/TooglepillArticle';




const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const Article = (user) => {

  return (
    <Container >
        <div className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: " Article " }]} />
        </div>
        <Card className="shadow" >
            <div className="mt-5">
              <TooglepillArticle />   
            </div>
 
            
        </Card>        
    </Container>
  )
}
export default Article;