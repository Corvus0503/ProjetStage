import React, { useState } from "react";
import NewBesoin from "../pages/Besoin/NewBesoin";
import BesoinEnAttent from "../pages/Besoin/BesoinEnAttent";
import BesoinRefuse from "../pages/Besoin/BesoinRefuse";
import BesoinList from "../pages/Besoin/BesoinList";

const ToggleablePills = (user) => {
  const [activePill, setActivePill] = useState("pill1");

  const handlePillClick = (pillId) => {
    setActivePill(pillId);
  };

  return (
    <div >
      <ul className="nav nav-pills">
        <li>
          <button
            className={`btn btn-primary ms-5 m-2 mt-2 ${activePill === "pill1" ? "active" : ""}`}
            onClick={() => handlePillClick("pill1")}
          >
            Nouveau
          </button>
        </li>
        <li>
          <button
            className={`btn btn-warning m-2 ${activePill === "pill2" ? "active" : ""}`}
            onClick={() => handlePillClick("pill2")}
          >
            En Attente
          </button>
        </li>
        <li>
          <button
            className={`btn btn-danger m-2 ${activePill === "pill3" ? "active" : ""}`}
            onClick={() => handlePillClick("pill3")}
          >
            Refusé
          </button>
        </li>
      </ul>
      <div className="mt-4">

        <hr className="m-3 mt-2 mb-2"/>
      
        {/* Contenu conditionnel en fonction de l'onglet actif */}
        {activePill === "pill1" && <div > <NewBesoin user={user}/> <div>
              <BesoinList/>
            </div></div>}

        {activePill === "pill2" && <div> <BesoinEnAttent/> </div>}

        {activePill === "pill3" && <div> <BesoinRefuse /> </div>}
      </div>
    </div>
  );
};

export default ToggleablePills;
