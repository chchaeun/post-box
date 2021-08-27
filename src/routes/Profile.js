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
    // const getMyTweet = async()=>{
    //   const tweets = await dbService
    //     .collection("tweets")
    //     .where("creatorId", "==", userObj.uid)
    //     .get();
    //   console.log(tweets.docs.map(doc=>doc.data()));
    // }
    // useEffect(()=>{
    //   console.log(userObj.uid)
    //   getMyTweet();
    // }, [])

    
    const onShareClick = ()=>{
      const copyText = document.getElementById("copy");
      copyText.select();
      document.execCommand("Copy");
      alert("주소가 복사되었습니다.")
  }
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange}/>
          <input type="submit"/>
        </form>
        <input style={{"display":"block"}} id="copy" value={`${document.location.origin}/${userObj.uid}`}/>
        <button onClick={onShareClick}>주소 복사</button>

        <button onClick={onLogOutClick}>Log Out</button>
      </div>

    );
}

export default Profile;