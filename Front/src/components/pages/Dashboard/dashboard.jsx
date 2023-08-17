import React, { useState } from "react";
import { Card } from '@mui/material';
import PieActiveArc from "../../Utils/PolarAreaTest";



const Dashboard = ({user}) => {
    
    return (
        <div className="App">
          <h1>Polar Area Chart Test</h1>
          <Card>
               <div className="text-start" style={{width:'30%'}}>
                    <PieActiveArc/>
               </div>
          </Card>
        </div>
      );
    }


export default Dashboard