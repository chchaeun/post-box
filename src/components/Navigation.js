import {FiInbox} from "react-icons/fi";
import {AiOutlineUser} from "react-icons/ai"
import 'styles/Home.css'
import 'bootstrap/dist/css/bootstrap.css';

const Navigation = ({userObj}) =>{

    return (
        <>
            <h2>Post-Box</h2>
            <nav>
                <ul>
                    <li>
                        <a href="/"><FiInbox id="icon"/>Home</a>
                    </li>
                    <li>
                        <a href="/profile"><AiOutlineUser id="icon"/>{userObj.displayName}</a>
                    </li>
                </ul>
            </nav>
        </>
    );

}

export default Navigation;