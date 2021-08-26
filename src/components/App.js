import React, {useState, useEffect} from "react";
import AppRouter from 'components/AppRouter';
import {authService} from 'fBase';
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged(user =>{
      if(user){
        setUserObj({
          uid: user.uid,
          displayName:user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    })
  }, []);

  const refreshUser = ()=>{
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName:user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  
  return (
    <>
      {init? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/>:"Loading..."}
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  );
}

export default App;
