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

const SideNav = ({IsOpen, togleSidebar, deconexion, user}) =>{
    const { setToken } = useAuth();
  const [lien] = useState([
    {name : 'Dashboard', icon: <SideDash/>, lien: "/Dashboard"},
    {name : 'Prevision', icon: <SideCat/>, lien: "/Prevision"},
    {name: 'Article',icon: <ArticleIcone/> ,lien:"/Article" },
    {name: 'Besoin',icon: <SideValid/>, lien:"/Besoin" }
    /*{name : 'User', icon: <SideCat/>},
    {name : 'Validation', icon: <SideValid/>}*/
])

const [lienAdmin] = useState([
    {name : 'Dashboard', icon: <SideDash/>, lien: "/Dashboard"},
    {name : 'Prevision',icon: <SideCat/>, lien: "/Prevision"},
    {name: 'Article',icon: <ArticleIcone/> ,lien:"/Article" },
    {name: 'Besoin',icon: <SideValid/>, lien:"/Besoin" },
    {name : 'User', icon: <SideUser/>,  lien:"/UserList"}
])

const lienPerm = () =>{
    if(user[0].TYPE_AG.includes("user")){
        return(
            lien.map((i)=><NavLink to={i.lien} className="nav-item" activeClassName="active"><div style={{paddingRight: "22px"}}>{i.icon}</div><span className={`sideText ${IsOpen ? "open" : ""}`}>{i.name}</span></NavLink>)
        )
    } else if(user[0].TYPE_AG.includes("admin")){
        return(
            lienAdmin.map((i)=><NavLink to={i.lien} className="nav-item" activeClassName="active"><div style={{paddingRight: "22px"}}>{i.icon}</div><span className={`sideText ${IsOpen ? "open" : ""}`}>{i.name}</span></NavLink>)
        )
    }
}

const logout = () => {
    deconexion()
    setToken();
    localStorage.removeItem("token")
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
                {lienPerm()}
                <div className="dec-cont"><button className="dec-item" onClick={logout}><div style={{paddingRight: "22px"}}><SideLougout/></div>Deconexion</button></div>
            </nav>
        </aside>
    </>
)
}


export default SideNav