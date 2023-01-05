import React from "react";
import "./login.css";
import {auth,provider} from "../firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import {Button} from "@mui/material";


function Login(){

    const [{},dispatch] = useStateValue();

    function signIn(){
        auth.signInWithPopup(provider)
            .then(result =>{
                dispatch({type:actionTypes.SET_USER,user:result.user})
            })
            .catch(error =>{
                console.log(error.message);
                alert(alert.message);
            })
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="logo512.png" alt="whatsapp"/>
                <div className="login_text">
                    <h1>Sign in to Messaging App</h1>
                </div>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    );
}

export default Login;