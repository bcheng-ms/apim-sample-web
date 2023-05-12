import { useState, useEffect } from 'react';
/*import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";*/
import { useMsal } from "@azure/msal-react";

const AccountDisplay = (props) => {
    const { instance, inProgress, accounts } = useMsal();
    const activeAccount = instance.getActiveAccount();
    console.log('AccountDisplay:', activeAccount);
    const [jwt, setJwt] = useState();
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState('')
    const direct = 'https://ms-apimsample-api.azurewebsites.net/api/accounts/test';
    const apim = 'https://ms-apimsample.azure-api.net/api/accounts/test';


    useEffect(() => {
        if (!jwt) {
            const accessTokenRequest = {
                scopes: ['openid', 'profile'],
                account: accounts[0],
            };
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    // Acquire token silent success
                    let accessToken = accessTokenResponse.idToken;
                    // Call your API with token 
                    console.log(accessTokenResponse)
                    console.log('Got Token', accessToken)
                    setJwt(accessToken);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [instance, accounts, inProgress, jwt]);

    const getAccount = () => {
        console.log(direct, apim);
        setLoading(true);
        fetch(apim, {
            headers: { Authorization: `Bearer ${jwt}` }
        })
            .then(resp => resp.json())
            .then(json => { setLoading(false); setApiResponse(json); console.log(JSON.stringify(json)) })
    }

    const showInfo = () => {
        return (
            <>
                <div>{apiResponse.token.name}</div>
                <div>{apiResponse.user}: {apiResponse.currency} {apiResponse.balance}</div>
            </>

        )
    }

    const renderSecured = () => {
        return (
            <div >
                <div >You are secured: </div>
                <div><button onClick={() => { getAccount() }}>Get Account</button></div>
                {loading ? <div>Loading...</div> : ''}
                <div>{apiResponse.token && showInfo()}</div>
            </div>
        );
    };

    return (
        <div>
            {renderSecured()}
        </div>
    );
}

export default AccountDisplay;

