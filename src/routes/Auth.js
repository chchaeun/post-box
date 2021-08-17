import React, {useState} from 'react';
import {authService, firebaseInstance} from 'fBase';
const Auth = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name==="email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value)
        }
    };

    const onSubmit = async(event) =>{
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            
        console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    
    
    const toggleAccount = ()=>{
        setNewAccount(prev => !prev);
    }
    
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
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                    />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                    />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log In" : "Create Account"}
            </span>
            {error}
            <div>
                <button onClick={onSocialLogin} name="google">Continue with Google</button>
                <button onClick={onSocialLogin} name="github">Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;