import React, {useState, useEffect} from 'react'
import { dbService, storageService } from 'fBase';
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) =>{

    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(()=>{
        dbService.collection("tweets").onSnapshot(snapshot=>{
            const tweetArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setTweets(tweetArr);
        });
    }, [])

    const onChange = (e) =>{
        const {target: {value}} = e;
        setTweet(value);
    }
    const onSubmit = async(e) =>{
        e.preventDefault();

        let attachmentUrl = "";
        if(attachment){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    }

    const onFileChange = (event) =>{
        const {
            target: {files}
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget: {result}} = finishedEvent; 
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);

    }
    const onAttachmentClear = () =>{
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={tweet} type="text" placeholder="What's happening?" maxLength={150}/>
                <input id="input-image" value="" type="file" accept="image/*" onChange={onFileChange} />
                {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onAttachmentClear}>Clear</button>
                </div>}
                <input type="submit" value="Tweet"/>
            </form>
            <div>
            {tweets.map(tweet=>(
                <Tweet key={tweet.id} 
                tweetObj={tweet} 
                isOwner={userObj.uid === tweet.creatorId}/>
            ))}
            </div>
        </div>
    );
}

export default Home;