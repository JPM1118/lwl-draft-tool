import React from 'react';

function App() {
  const loginRequest = () => {
    return fetch('http://localhost:3000/auth/facebook', {
      method: 'GET',
      credentials: 'include'
    })
  }
  return (
    <div className="App">
      <p>Home</p>
      <button onClick={loginRequest}>Login</button>
    </div>
  );
}

export default App;
