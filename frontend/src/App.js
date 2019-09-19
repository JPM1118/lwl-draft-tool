import React, { useState, useEffect } from 'react';

import DraftTool from './pages/DraftTool';
import Login from './pages/login/Login';
import DetectExtension from './pages/DetectExtension';

import Header from './components/header/header';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [draftDetected, setDraftDetected] = useState(true)
  const [isloading, setIsLoading] = useState(true)

  const loggedInRequest = async () => {
    setIsLoading(true)
    let response = await fetch('http://localhost:3000/auth/loggedIn', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })

    if (response.status === 200 || response.status === 302) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setIsLoading(false)
  }
  const logoutRequest = async () => {
    console.log('clicked')
    let response = await fetch('http://localhost:3000/auth/logout', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })

    if (response.status === 200 || response.status === 302) {
      setLoggedIn(false)
    }
  }
  useEffect(() => {
    loggedInRequest();
  }, [])

  return (
    <>
      <Header logout={logoutRequest} />
      {!isloading &&
        <div>
          {!loggedIn && <Login />}
          {loggedIn && !draftDetected && <DetectExtension />}
          {loggedIn && draftDetected && <DraftTool />}
        </div>
      }
    </>
  );
}

export default App;
