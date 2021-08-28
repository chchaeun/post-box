import React, {useState} from 'react';
import {authService, firebaseInstance} from 'fBase';
import AuthForm from 'components/AuthForm';
import {AiFillGoogleCircle, AiFillGithub} from 'react-icons/ai'
import 'styles/Auth.css'

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
            <h2>Post-Box</h2>
            <AuthForm/>
            <div className="social">
                <button className="social-one btn btn-outline-secondary" onClick={onSocialLogin} name="google">
                    <AiFillGoogleCircle size="20" style={{"marginBottom":"2px"}}/> Google로 로그인</button>
                <button className="social-two btn btn-outline-secondary" onClick={onSocialLogin} name="github">
                    <AiFillGithub size="20" style={{"marginBottom":"2px"}}/> Github로 로그인</button>
            </div>
        </div>
    );
}

export default Auth;