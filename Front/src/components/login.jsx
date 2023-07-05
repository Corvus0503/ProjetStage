import React from "react";
import { useState } from "react";
import "./styles/login.css"

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
                    <input type="text" placeholder="Nom d'utitilisateur" className="log-input"/>
                </div>
                <div className="input-box">
                    <input type={isShow ? "text" : "password"} placeholder="Mot de passe" endA className="log-input"></input>
                    <button onClick={showMdp}>{isShow ? "0_0" : "-_-"}</button>
                </div>
                <button className="log-btn">Connexion</button>
            </form>
        </div>
    )
}

export default Login