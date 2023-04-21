import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
function App() {
  const [message, setMessage] = useState('Not Logged in');
  const responseMessage = (response) => {
    console.log(response);
    setMessage(response)
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
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </header>
    </div>
  );
}

export default App;
