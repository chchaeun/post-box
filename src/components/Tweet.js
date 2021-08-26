import { dbService, storageService } from "fBase";
import React, {useState} from "react";

const Tweet = ({tweetObj, isOwner}) =>{

    const domain = window.location.pathname.split('/')[1];

    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure?");
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
        <div>
        { editing ? (
            <>
            <form onSubmit={onSubmit}>
                <input type="text"
                onChange={onChange}
                placeholder="Edit your tweet"
                value={newTweet}
                required
                />
                <input type="submit"
                value="Update"
                />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
            </>
            ):(
            <div>
                <h4>{tweetObj.text}</h4>
                {tweetObj.attachmentUrl && 
                <img src={tweetObj.attachmentUrl} width="50px" height="50px"/>}
                {isOwner && 
                <>
                    <button onClick={onDeleteClick}>Delete Tweet</button>
                    <button onClick={toggleEditing}>Edit Tweet</button>
                </>}
            </div>
            )
                
        }
        </div>
    );
}

export default Tweet;