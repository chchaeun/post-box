import React, {useState, useEffect} from 'react'
import { dbService } from 'fBase';
import Tweet from 'components/Tweet';

const Home = ({userObj}) =>{

    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

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
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setTweet("");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={tweet} type="text" placeholder="What's happening?" maxLength={150}/>
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