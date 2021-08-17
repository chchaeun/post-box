import React, {useState, useEffect} from "react";
import AppRouter from 'components/AppRouter';
import {authService} from 'fBase';
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged(user =>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);

  return (
    <>
      {init? <AppRouter isLoggedIn={isLoggedIn} />:"Loading..."}
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  );
}

export default App;
