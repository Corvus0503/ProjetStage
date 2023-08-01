import React from "react";
import SideDash from "./images/SideDash";
import SideUser from "./images/SideUser";
import SideCat from "./images/SideCat";
import SideValid from "./images/SideValid";
import SideLougout from "./images/SideLogout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./pages/login/authProvider";
import './styles/sidebar.css'
import ArticleIcone from "./images/ArticleIcone";

const SideNav = ({IsOpen, togleSidebar, deconexion}) =>{
    const { setToken } = useAuth();
  const [lien] = useState([
    {name : 'Dashboard', icon: <SideDash/>, lien: "/Dashboard"},
    {name : 'Prevision', icon: <SideUser/>, lien: "/Prevision"},
    {name: 'Article',icon: <ArticleIcone/> ,lien:"/Article" },
    {name: 'Besoin', lien:"/Besoin" }
    /*{name : 'User', icon: <SideCat/>},
    {name : 'Validation', icon: <SideValid/>}*/
])

const deconnexion = () => {
    deconexion()
    setToken();
    sessionStorage.removeItem("user")
}

return(
    <>
        <aside className={`sidebar ${IsOpen ? "open" : ""}`}>
            <nav>
                <button onClick={togleSidebar} className="sidebar-toogle">
                    <div className="burger"></div>
                    <div className="burger"></div>
                    <div className="burger"></div>
                </button><br/><br/>
                {lien.map((i)=><NavLink to={i.lien} className="nav-item" activeClassName="active"><div style={{paddingRight: "22px"}}>{i.icon}</div><span className={`sideText ${IsOpen ? "open" : ""}`}>{i.name}</span></NavLink>)}
                <div className="dec-cont"><button className="dec-item" onClick={deconnexion}><div style={{paddingRight: "22px"}}><SideLougout/></div>Deconexion</button></div>
            </nav>
        </aside>
    </>
)
}


export default SideNav