import React from "react";
import SideDash from "./images/SideDash";
import SideUser from "./images/SideUser";
import SideCat from "./images/SideCat";
import SideValid from "./images/SideValid";
import { useState } from "react";
import './styles/sidebar.css'

const SideNav = ({IsOpen, togleSidebar, deconexion}) =>{
  const [lien] = useState([
    {name : 'Dashboard', icon: <SideDash/>},
    {name : 'Catalogue', icon: <SideUser/>},
    {name : 'User', icon: <SideCat/>},
    {name : 'Validation', icon: <SideValid/>}
])

return(
    <>
        <aside className={`sidebar ${IsOpen ? "open" : ""}`}>
            <nav>
            <button onClick={togleSidebar} className="sidebar-toogle">
                <div className="burger"></div>
                <div className="burger"></div>
                <div className="burger"></div>
            </button>
                {lien.map((i)=><div className="nav-item" activeClassName="active"><div style={{paddingRight: "22px"}}>{i.icon}</div>{i.name}</div>)}
                <div className="dec-cont"><button className="dec-item" onClick={deconexion}>Deconexion</button></div>
            </nav>
        </aside>
    </>
)
}


export default SideNav