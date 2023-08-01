import React, { useEffect } from "react";
import { useState } from "react";
import "../../styles/login.css"
import IconButton from "@material-ui/core/IconButton";
//import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import axios from "axios"

const Login = ({isConn, setIsConn, saveCon, user, setUser, getCon }) =>{
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [isShow, setIsShow] = useState(false)
    
    const showMdp = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }
    const [infoCon, setInfoCon] = useState({
        pseudo: "",
        mdp: ""
    })

    const loadUser = async () => {
        try {
          const response = await axios.post('http://localhost:8080/admin', infoCon);
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
        /*axios.post('http://localhost:8080/admin', infoCon).then((response) => {
            if (!response.data.message) {
                setUser(response.data);
            } else {
                console.log (response.data[0].message);
            }
        });*/
      };

    const connexion = async (e) => {
        e.preventDefault()
        await loadUser()
            if(user[0].NOM_UTIL_AG===infoCon.pseudo && user[0].PASSWORD===infoCon.mdp){
                setToken(JSON.stringify(user));
                setIsConn(true)
                saveCon()
                navigate("/Dashboard", { replace: true });
            } else {
                alert("Pseudo ou mot de passer incorrect")
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