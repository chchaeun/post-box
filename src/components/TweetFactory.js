import { dbService, storageService } from "fBase";
import { v4 as uuidv4 } from "uuid";
import react, {useState, useEffect} from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import 'styles/PostBox.css'

import { BiImageAdd } from 'react-icons/bi'

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
    <form onSubmit={onSubmit} 
    className="form-group"
    id="post-form"
    >
        <textarea
        style={{"resize":"none"}}
        rows="2"
        onChange={onChange} 
        value={tweet} 
        type="text" 
        placeholder="편지 쓰기" 
        maxLength={150}
        className="form-control" 
        id="input-post"
        />
        <label for="input-image"><BiImageAdd size="24"/></label>
        <input 
        id="input-image" 
        value="" 
        type="file" 
        accept="image/*" 
        onChange={onFileChange} 
        />
        {attachment && 
        <div id="attach">
            <img src={attachment} width="50px" height="50px"
            style={{"margin-right":"5px"}}/>
            <button onClick={onAttachmentClear}
            style={{"border":"none", "backgroundColor":"white", "color":"gray"}}>
                이미지 삭제</button>
        </div>}

        <input id="post-submit" type="submit" value="보내기"
        className="btn btn-outline-secondary"
        />
    </form>);
}

export default TweetFactory;