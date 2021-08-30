import React, {useState, useEffect} from 'react'
import { dbService, storageService, authService } from 'fBase';
import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import {useLocation} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import 'styles/PostBox.css'

const PostBox = ({userObj}) =>{

    const [tweets, setTweets] = useState([]);
    const [pageOwner, setPageOwner] = useState(window.location.pathname.split('/')[2]);
    const [ownerName, setOwnerName] = useState();

    useEffect(() => {
        setPageOwner(window.location.pathname.split('/')[2]);
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

    return (
        <div>
            <TweetFactory userObj={userObj} pageOwner={pageOwner}/>
            <div id="posts">
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