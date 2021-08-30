import { useState } from "react";
import 'styles/Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";
import {GoMail} from 'react-icons/go'
import {BsPencil} from 'react-icons/bs'
const Home = ({userObj})=>{

    const history = useHistory();

    const [friendId, setFriendId] = useState();

    const onChange = (event)=>{
        const {target: {value}} = event;
        setFriendId(value);
    }

    const onSubmit= (event)=>{
        event.preventDefault();
        history.push(`/${friendId}`);
        
    }

    const onMyPost = ()=>{
        history.push(`/${userObj.uid}`);
    }

    return(
        <div id="container">
            <button id="my-box" type="button" onClick={onMyPost}>
            <GoMail size="24" color="rgb(90, 90, 90)"/>
            <p style={{"padding":"10px"}}>내 우편함 가기</p></button>

            <form onSubmit={onSubmit} id="friend-form" className="form-group">
                <BsPencil size="24" color="rgb(90, 90, 90)" style={{"margin-left":"59px"}}/><br/>
                <label for="friend-box">친구의 우편함 가기</label>
                <input name="friend-box" 
                className="form-control" 
                type="text" 
                value={friendId} 
                onChange={onChange}
                placeholder="코드 입력"/>
                <input id="friend-submit" type="submit" value="방문하기" 
                className="btn btn-outline-secondary"/>
            </form>
        </div>
    );
}
export default Home;