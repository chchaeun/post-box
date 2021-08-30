import {FiInbox} from "react-icons/fi";
import {AiOutlineUser} from "react-icons/ai"
import 'styles/Home.css'
import 'bootstrap/dist/css/bootstrap.css';

import {Link, useHistory} from 'react-router-dom'

const Navigation = ({userObj}) =>{

    const history = useHistory();

    const onHomeClick = ()=>{
        history.push("/");
    }
    const onProfileClick = ()=>{
        history.push('/profile')
    }
    return (
        <>
        <h2>Post-Box</h2>
            <nav>
                <ul>
                    <li>
                        <span type="button" onClick={onHomeClick}><FiInbox id="icon"/>Home</span>
                    </li>
                    <li>
                        <span type="button" onClick={onProfileClick}><AiOutlineUser id="icon"/>{userObj.displayName}</span>
                    </li>
                </ul>
            </nav>
        </>
    );

}

export default Navigation;