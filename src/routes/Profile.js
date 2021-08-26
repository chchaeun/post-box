import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fBase";

const Profile = ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
      authService.signOut();
      history.push("/");
    };

    const onChange = (event)=>{
      const {target: {value}} = event;
      setNewDisplayName(value);

    }

    const onSubmit = async(event)=>{
      event.preventDefault();
      if(userObj.displayName !== newDisplayName){
        await userObj.updateProfile({
          displayName: newDisplayName
        })
      }
      refreshUser();
    }
    const getMyTweet = async()=>{
      const tweets = await dbService
        .collection("tweets")
        .where("creatorId", "==", userObj.uid)
        .get();
      console.log(tweets.docs.map(doc=>doc.data()));
    }
    useEffect(()=>{
      console.log(userObj.uid)
      getMyTweet();
    }, [])
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange}/>
          <input type="submit"/>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
      </div>
    );
}

export default Profile;