import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fBase";

import 'styles/Profile.css'

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
        <form className="form-group change-form" onSubmit={onSubmit}>
          <span>이름 바꾸기</span>
          <input className="form-control"  id="change-name" type="text" placeholder="이름" value={newDisplayName} onChange={onChange}/>
          <input className="btn btn-outline-secondary" type="submit"/>
        </form>
        <span className="share">내 우편함 공유하기</span>
        <input className="form-control" style={{"display":"block"}} id="copy" value={`${document.location.origin}/${userObj.uid}`}/>
        <button className="btn btn-outline-secondary" id="copy-btn" onClick={onShareClick}>주소 복사</button>

        <button id="logout" className="btn btn-outline-secondary" onClick={onLogOutClick}>로그아웃</button>
      </div>

    );
}

export default Profile;