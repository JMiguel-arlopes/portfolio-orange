import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import styles from "../form/FormLogin/formlogin.module.css";

const GoogleLoginButton = () => {

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    const navigate = useNavigate();

    const handleLoginSuccess = (credentialResponse) => {
        navigate('/');
        console.log(credentialResponse); // esta undefined
    };

    <button className={styles.sign_in_google} onClick={() => login()}>

        <FcGoogle />
        Entrar com Google

        <h3>Faça login com email</h3>

    </button>

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                handleLoginSuccess();
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default GoogleLoginButton; // projeto