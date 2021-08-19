import React, {useState, useEffect} from "react";
import AppRouter from 'components/AppRouter';
import {authService} from 'fBase';
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged(user =>{
      if(user){
        setUserObj(user);
      }
      setInit(true);
    })
  }, []);

  return (
    <>
      {init? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/>:"Loading..."}
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  );
}

export default App;
