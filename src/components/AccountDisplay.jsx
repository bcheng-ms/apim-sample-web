import { useState } from 'react';

const AccountDisplay = (props) => {
    const [jwt] = useState(props.idToken);
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState('')
    const direct = 'https://ms-apimsample-api.azurewebsites.net/api/accounts/test';
    const apim = 'https://ms-apimsample.azure-api.net/api/accounts/test';
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
