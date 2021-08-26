import { authService } from 'fBase';
import react, {useState} from 'react'


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

    </>)
}

export default AuthForm;