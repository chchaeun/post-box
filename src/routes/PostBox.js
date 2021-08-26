import React, {useState, useEffect} from 'react'
import { dbService, storageService } from 'fBase';
import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import {useLocation} from 'react-router-dom'
const PostBox = ({userObj}) =>{

    const [tweets, setTweets] = useState([]);
    const [pageOwner, setPageOwner] = useState(window.location.pathname.split('/')[1]);

    useEffect(() => {
        setPageOwner(window.location.pathname.split('/')[1]);
    }, [window.location.pathname])

    useEffect(()=>{
        dbService.collection(`${pageOwner}`).onSnapshot(snapshot=>{
            const tweetArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setTweets(tweetArr);
        });
    }, [])

    const onShareClick = ()=>{
        const copyText = document.getElementById("copy");
        copyText.select();
        document.execCommand("Copy");
        alert("클립보드에 복사되었습니다.")
    }
    return (
        <div>
            <input style={{"display":"None"}} id="copy" value={userObj.uid}/>
            <button onClick={onShareClick}>Share my Post Box ID</button>
            <TweetFactory userObj={userObj} pageOwner={pageOwner}/>
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

export default PostBox;