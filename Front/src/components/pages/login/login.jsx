import React, { useEffect } from "react";
import { useState } from "react";
import "../../styles/login.css"
import IconButton from "@material-ui/core/IconButton";
//import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({isConn, setIsConn, saveCon}) =>{
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const [user, setUser] = useState({
        MATRICULE: "",
        NOM_AG: "",
        PASSWORD: ""
    })

    const [infoCon, setInfoCon] = useState({
        pseudo: "",
        mdp: ""
    })
    const showMdp = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }
    const loadUser = async () => {
        try {
          const response = await axios.get('http://localhost:8080/admin');
          setUser(response.data);
          navigate("/Dashboard")
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        loadUser()
      }, []) ; 

    console.log(user)

    const connexion = (e) => {
        e.preventDefault()
        for (let i in user){
            if(user[i].NOM_AG===infoCon.pseudo && user[i].PASSWORD===infoCon.mdp){
                setIsConn(!isConn)
                saveCon()
                console.log(isConn)
                return <Navigate to="/Dashboard"/>
            } else {
                
                alert("Pseudo ou mot de passer incorrect")
            }
          }
    }

    return(
        <div className="login">
            <form className="login-form">
                <h2>Bienvenue</h2>
                <h3>Veuillez vous connecter pour continuer</h3>
                <div className="input-box">
                    <Input value={infoCon.pseudo} onChange={e => setInfoCon({...infoCon, pseudo : e.target.value})} type="text" placeholder="Nom d'utitilisateur" className="log-input"/>
                </div>
                <div className="input-box">
                    <Input value={infoCon.mdp} onChange={e => setInfoCon({...infoCon, mdp : e.target.value})} type={isShow ? "text" : "password"} placeholder="Mot de passe" 
                    endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={showMdp}>
                                {isShow ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    } 
                    className="log-input"></Input>
                </div>
                <button onClick={connexion} className="log-btn">Connexion</button>
            </form>
        </div>
    )
}

export default Login