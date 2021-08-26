import { dbService, storageService } from "fBase";
import { v4 as uuidv4 } from "uuid";
import react, {useState, useEffect} from 'react'

const TweetFactory = ({userObj, pageOwner}) =>{
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

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
            attachmentUrl,
        }
        await dbService.collection(`${pageOwner}`).add(tweetObj);
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
    <form onSubmit={onSubmit}>
        <input onChange={onChange} value={tweet} type="text" placeholder="What's happening?" maxLength={150}/>
        <input id="input-image" value="" type="file" accept="image/*" onChange={onFileChange} />
        {attachment && 
        <div>
            <img src={attachment} width="50px" height="50px"/>
            <button onClick={onAttachmentClear}>Clear</button>
        </div>}
        <input type="submit" value="Tweet"/>
    </form>);
}

export default TweetFactory;