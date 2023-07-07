import React from "react";
import { useState } from "react";
import "./styles/login.css"
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const Login = () =>{
    const [isShow, setIsShow] = useState(false)
    const showMdp = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }

    return(
        <div className="login">
            <form className="login-form">
                <h2>Bienvenue</h2>
                <h3>Veuillez vous connecter pour continuer</h3>
                <div className="input-box">
                    <Input type="text" placeholder="Nom d'utitilisateur" className="log-input"/>
                </div>
                <div className="input-box">
                    <Input type={isShow ? "text" : "password"} placeholder="Mot de passe" 
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={showMdp}>
                            {isShow ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    } 
                    className="log-input"></Input>
                </div>
                <button className="log-btn">Connexion</button>
            </form>
        </div>
    )
}

export default Login