import { dbService, storageService } from "fBase";
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'styles/PostBox.css'
const Tweet = ({tweetObj, isOwner}) =>{

    const domain = window.location.pathname.split('/')[1];

    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("정말 지우시겠습니까?");
        if(ok){
            await dbService.doc(`${domain}/${tweetObj.id}`).delete();
            await storageService.refFromURL(`${tweetObj.attachmentUrl}`).delete();
        }
    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        await dbService.doc(`${domain}/${tweetObj.id}`).update({
            text: newTweet
        })
        setEditing(false);
    }

    const onChange = (e) =>{
        const {target: {value}} = e;
        setNewTweet(value);
    }

    const toggleEditing = () => setEditing(prev=>!prev);
    return(
        <div id="post-obj">
        { editing ? (
            <>
            <form onSubmit={onSubmit}>
                <input type="text"
                onChange={onChange}
                value={newTweet}
                required
                id="edit-form"
                />
                <input className="btn buttons" type="submit"
                value="이렇게 보내기"
                />
            </form>
            <button className="btn buttons" onClick={toggleEditing} >취소하고 그대로</button>
            </>
            ):(
            <div>
                <div width="400px" style={{"word-break":"break-all"}}>{tweetObj.text}</div>
                {tweetObj.attachmentUrl && 
                <img src={tweetObj.attachmentUrl} width="50px" height="50px"/>}
                {isOwner && 
                <>
                    <button className="btn buttons" 
                    onClick={toggleEditing}>고치기</button>
                    <button className="btn buttons"
                    onClick={onDeleteClick}>지우기</button>
                </>}
            </div>
            )
                
        }
        </div>
    );
}

export default Tweet;