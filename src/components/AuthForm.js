import { authService } from 'fBase';
import react, {useState} from 'react'

import 'styles/Auth.css'

const AuthForm = () =>{
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
    
    return(<>
    <form onSubmit={onSubmit} className="form-group">
                <input 
                    type="text"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={onChange}
                    required
                    className="form-control login-input"
                    
                    />
                <input 
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChange}
                    required
                    className="form-control password-input"
                    />
                <input id="submit-btn" className="btn btn-outline-secondary" type="submit" value={newAccount ? "회원가입" : "로그인"}/>
            </form>
            <span className="toggle" onClick={toggleAccount}>
                {newAccount ? "로그인 하기" : "가입 하기"}
            </span>
            {error}

    </>)
}

export default AuthForm;