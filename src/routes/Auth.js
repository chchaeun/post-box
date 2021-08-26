import React, {useState} from 'react';
import {authService, firebaseInstance} from 'fBase';
import AuthForm from 'components/AuthForm';
const Auth = () =>{
    const onSocialLogin = async (event) =>{
        const {target: {name}} = event;
        
        let provider;
        if(name==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    }
    
    return (
        <div>
            <AuthForm/>
            <div>
                <button onClick={onSocialLogin} name="google">Continue with Google</button>
                <button onClick={onSocialLogin} name="github">Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;