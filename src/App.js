import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import SecuredFragment from './SecuredFragment';
function App() {
  const [message, setMessage] = useState('Not Logged in');
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwt, setJwt] = useState();
  const responseMessage = (response) => {
    console.log(response);
    setMessage(`Logged In: ${response}`);
    setJwt(response.credential);
    setLoggedIn(true);
};
const errorMessage = (error) => {
    console.log(error);
    setMessage(error);
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Login message:
        </p>
        <p>
        {message}
        </p>
        {loggedIn ? <SecuredFragment jwt={jwt}/> : <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />}
      </header>
    </div>
  );
}

export default App;
