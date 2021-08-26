import { useState } from "react";
import 'styles/Home.css'
import 'bootstrap/dist/css/bootstrap.css';

const Home = ({userObj})=>{
    const [friendId, setFriendId] = useState();

    const onChange = (event)=>{
        const {target: {value}} = event;
        setFriendId(value);
    }

    const onSubmit= (event)=>{
        event.preventDefault();
        window.location.replace(`/${friendId}`);
    }

    const onMyPost = ()=>{
        window.location.replace(`/${userObj.uid}`);
    }

    return(
        <div id="container">
            <form onSubmit={onSubmit} className="form-group">
                <label for="friend-box">Friend's Post Box</label>
                <input name="friend-box" 
                className="form-control" 
                type="text" 
                value={friendId} 
                onChange={onChange}/>
                <input id="friend-submit" type="submit" value="submit" className="btn btn-outline-secondary"/>
            </form>
            <button type="button" onClick={onMyPost} className="btn btn-outline-secondary">My Post Box</button>
        </div>
    );
}
export default Home;