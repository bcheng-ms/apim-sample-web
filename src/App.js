import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Not Logged in');
  const [loggedIn, setLoggedIn] = useState(false);
  const [jwt, setJwt] = useState();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState('')
  const responseMessage = (response) => {
    console.log(response);
    setMessage(`Logged In`);
    setJwt(response.credential);
    setLoggedIn(true);
};
const errorMessage = (error) => {
    console.log(error);
    setMessage(error);
};
const direct = 'https://ms-apimsample-api.azurewebsites.net/api/accounts/test';
const apim =  'https://ms-apimsample.azure-api.net/api/accounts/test';
const getAccount = () =>{
  console.log(direct,apim);
  setLoading(true);
  fetch(apim, {
    headers: {Authorization: `Bearer ${jwt}`}
  })
     .then(resp => resp.json())
     .then(json => {setLoading(false);setApiResponse(json); console.log(JSON.stringify(json))})
}

const showInfo = ()=>{
  return(
    <>
    <div>{apiResponse.token.name}</div>
    <div>{apiResponse.user}: {apiResponse.currency} ${apiResponse.balance}</div>
    </>
  
  )
}

const renderSecured = () => {
  return (
    <div >
      <div >You are secured: </div>
      <div><button onClick={()=>{getAccount()}}>Get Account</button></div>
      {loading ? <div>Loading...</div> : ''}
      <div>{apiResponse.token && showInfo()}</div>
    </div>
  );
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
        {loggedIn ? renderSecured() : <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />}
      </header>
    </div>
  );
}

export default App;
