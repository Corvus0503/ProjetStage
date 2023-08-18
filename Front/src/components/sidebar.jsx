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
import Topnav from "./Topnav";
import { useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu";

const SideNav = ({IsOpen, togleSidebar, deconexion, user, comments, togleNot}) =>{
    const navigate = useNavigate();
    const { setToken } = useAuth();
  const [lien] = useState([
    {name : 'Dashboard', icon: <SideDash/>, lien: "/Dashboard"},
    {name : 'Prevision', icon: <SideCat/>, lien: "/Prevision"},
    {name: 'Article',icon: <ArticleIcone/> ,lien:"/Article" },
    {name: 'Besoin',icon: <SideValid/>, lien:"/Besoin" }
])

const [lienAdmin] = useState([
    {name : 'Dashboard', icon: <SideDash/>, lien: "/Dashboard"},
    {name : 'Prevision',icon: <SideCat/>, lien: "/Prevision"},
    {name : 'Division',icon: <SideCat/>, lien: "/Division"},
    {name: 'Article',icon: <ArticleIcone/> , subNav : [
        {name: 'Nouveau',icon: "." ,lien:"/Article/Nouvel_Article"},
        {name: 'Liste',icon: "." ,lien:"/Article/Liste"},
    ]},
    {name : 'User', icon: <SideUser/>,  lien:"/UserList"}
])

const [lienBAG] = useState([
    {name : 'Dashboard', icon: <SideDash/>, lien: "/Dashboard"},
    {name : 'Prevision',icon: <SideCat/>, lien: "/Prevision"},
    {name: 'Article',icon: <ArticleIcone/> , subNav : [
        {name: 'Nouveau',icon: "." ,lien:"/Article/Nouvel_Article"},
        {name: 'Liste',icon: "." ,lien:"/Article/Liste"},
    ]},
    {name: 'Besoin',icon: <SideValid/>, lien:"/Besoin"},
    {name: 'Validation',icon: <SideValid/>, lien:"/BesoinBag" },
])

const lienPerm = () =>{
    if(user[0].TYPE_AG.includes("User")){
        return(
            lien.map((item, index)=>{
                return(<SubMenu item={item} key={index} IsOpen={IsOpen}/>)
            })
        )
    } else if(user[0].TYPE_AG.includes("Admin")){
        return(
            lienAdmin.map((item, index)=>{
                return(<SubMenu item={item} key={index} IsOpen={IsOpen}/>)
            })
        )
    } else if(user[0].TYPE_AG.includes("BAG")){
        return(
            lienBAG.map((item, index)=>{
                return(<SubMenu item={item} key={index} IsOpen={IsOpen}/>)
            })
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
        <Topnav togleSidebar={togleSidebar} user={user} IsOpen={IsOpen} logout={logout} comments={comments} togleNot={togleNot}/>
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