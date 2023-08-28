import React, { useEffect, useState } from "react";
import { styled, Card } from '@mui/material';
import PieActiveArc from "../../Utils/PolarAreaTest";
import SimpleBarChart from '../../Utils/simpleBarChart'
import DoughnutChart from "../../Utils/Doughnut";
import Breadcrumb from "../../Utils/Breadcrumb";
import poppins from '../../styles/Poppins/Poppins-ExtraBold.ttf'



const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Dashboard = ({user}) => {

  // useEffect(() => {
  //   window.addEventListener("load", () => {
  //     setShouldRenderChart(true); // Activez le rendu du graphique une fois que la page est chargée
  //   });
  //   return () => window.removeEventListener("load", () => {});
  // }, []);
  const typeCompte=user[0].TYPE_AG;
 console.log(user)
  //const customColors = ['rgb(0, 0, 0)', 'rgb(77, 75, 75)' ,'rgb(255, 255, 255)'];
    return (
        <Container >
          <div className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: " Dasboard " }]} />
          </div > 
          <div className="card shadow p-5 ">
            <div className="text-start m-4" style={{fontFamily:'poppins',fontSize:'15px'}}>
                <h2> Suivi des besoins </h2>
            </div>
            <div className="row">
            {typeCompte !== "BAG" && (<Card className="shadow mb-3 ">
                  <div style={{ height: "300px" }}>
                    <DoughnutChart height="100%" user={user}/>
                  </div>
              </Card>)}
            <div className="col-6">
              {typeCompte === "BAG" && (<Card className="shadow mb-3 ">
                  <div style={{ height: "400px" }}>
                    <DoughnutChart height="100%" user={user}/>
                  </div>
              </Card>)}
            </div>
            <div className="col-6">
            {typeCompte === "BAG" &&  (
              <Card className="shadow mb-3 pt-5 pb-5 pe-5 ">
                  <div style={{height: "300px" }}>
                        <PieActiveArc user={user} height="100%"/>                    
                  </div>
              </Card> 
              )} 
            </div>       
            </div>
            <div>
              {typeCompte === "BAG" &&  (
                
                <Card className="shadow mb-3 pt-5 pb-5 pe-5 ">
                      <div style={{height: "300px" }}>
                        <SimpleBarChart user={user} />
                      </div>
                </Card>
                )}
            </div>
          </div>
        </Container>
      );
    }


export default Dashboard