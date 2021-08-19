import { dbService } from "fBase";
import React, {useState} from "react";

const Tweet = ({tweetObj, isOwner}) =>{

    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
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