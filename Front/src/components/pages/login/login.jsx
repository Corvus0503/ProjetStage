import React, { useEffect } from "react";
import { useState } from "react";
import "../../styles/login.css"
import LoginPhoto from"../../images/account-validation-bg-mob.png"
import LoginAvatar from"../../images/blog-wp-login.png"
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import io from "socket.io-client";
import axios from "axios"
import Swal from 'sweetalert2'


const Login = ({isConn, setIsConn, saveCon, user, setUser, getCon }) =>{
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [isShow, setIsShow] = useState(false)
    
    const showMdp = (e) => {
        e.preventDefault();
        setIsShow(!isShow);
    };
    const [infoCon, setInfoCon] = useState({
        pseudo: "",
        mdp: ""
    })

    const loadUser = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin', infoCon);
            setUser((prevUser) => response.data.length > 0 ? response.data : prevUser);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pseudo ou mot de passe incorrect',
            });
        }
    };  

    const connexion = async (e) => {
        e.preventDefault();
    
        try {
            await loadUser();
    
            if (user && user.length > 0 && user[0].NOM_UTIL_AG === infoCon.pseudo && user[0].PASSWORD === infoCon.mdp) {
                socket.emit("userLoggedIn", { username: user[0].NOM_UTIL_AG, socketId: user[0].MATRICULE });
                setToken(JSON.stringify(user));
                setIsConn(true);
                saveCon();
                navigate("/Dashboard", { replace: true });
            } else if (user && user.length > 0 && user[0].ACTIVATION.includes("Desactivé")) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ce compte est désactivé',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Pseudo ou mot de passe incorrect',
                });
            }
        } catch (error) {
            console.error(error);
        }
    }; 

    // Initialize a Socket.IO client instance
    const socket = io("http://localhost:8080");

    useEffect(() => {
        const socket = io("http://localhost:8080");
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);


    return(
        <div className="login">
            <img src={LoginPhoto} alt="login image"className='login_img'/>

                <h1>
                    Bienvenue
                </h1>

                <form className="login-form">

                    <img src={LoginAvatar} alt="" />
                    
                    <div className="input-box">
                        <Input style={{color:'white'}} value={infoCon.pseudo} required onChange={e => setInfoCon({...infoCon, pseudo : e.target.value})} type="text" placeholder="Nom d'utitilisateur....." className="log-input"/>
                    </div>
                    <div className="input-box">
                        <Input style={{color:'white'}} value={infoCon.mdp} required onChange={e => setInfoCon({...infoCon, mdp : e.target.value})} type={isShow ? "text" : "password"} placeholder="Mot de passe......." 
                        endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={showMdp}>
                                    {isShow ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        } 
                        className="log-input"></Input>
                    </div>
                    <button onClick={connexion} className="btn btn-primary mt-5">Connexion</button>
                </form>
        </div>
    )
}

export default Login