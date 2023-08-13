import React from "react";
import SideDash from "./images/SideDash";
import SideUser from "./images/SideUser";
import SideCat from "./images/SideCat";
import SideValid from "./images/SideValid";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./pages/login/authProvider";
import './styles/sidebar.css'
import ArticleIcone from "./images/ArticleIcone";
import Topnav from "./Topnav";
import { useNavigate } from "react-router-dom";

const SideNav = ({IsOpen, togleSidebar, deconexion, user}) =>{
    const navigate = useNavigate();
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
    if(user[0].TYPE_AG.includes("User")){
        return(
            lien.map((i)=><NavLink to={i.lien} className="nav-item" activeClassName="active"><div style={{paddingRight: "22px"}}>{i.icon}</div><span className={`sideText ${IsOpen ? "open" : ""}`}>{i.name}</span></NavLink>)
        )
    } else if(user[0].TYPE_AG.includes("Admin")){
        return(
            lienAdmin.map((i)=><NavLink to={i.lien} className="nav-item" activeClassName="active"><div style={{paddingRight: "22px"}}>{i.icon}</div><span className={`sideText ${IsOpen ? "open" : ""}`}>{i.name}</span></NavLink>)
        )
    }
}

const logout = () => {
    deconexion()
    setToken();
    navigate("/");
    localStorage.removeItem("token")
    window.location.reload()
}

return(
    <>
        <Topnav togleSidebar={togleSidebar} user={user} IsOpen={IsOpen} logout={logout}/>
        <aside className={`sidebar ${IsOpen ? "open" : ""}`}>
            <nav>
                <br/><br/><br/><br/><br/>
                {lienPerm()}
            </nav>
        </aside>
    </>
)
}

export default SideNav