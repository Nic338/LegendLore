import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import { ApplicationViews } from './components/ApplicationViews';
import { Authorize } from './components/Authorize';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  useEffect(() => {
      if (!localStorage.getItem("userProfile")) {
          setIsLoggedIn(false)

      }
  }, [isLoggedIn])

  return (
      <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          {isLoggedIn ?
              <ApplicationViews />
              :
              <Authorize setIsLoggedIn={setIsLoggedIn} />
          }
      </BrowserRouter>
  );
}

export default App;
