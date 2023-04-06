import './App.css';

import React, { useState } from 'react';

function App() {
  const [responseMessage, setResponseMessage] = useState('');

  const handleApiRequest = async () => {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Origin', 'true');
    headers.set('Content-Type', 'application/json');

    const response = await fetch('http://localhost:5000/api', {
      GET: headers,
    })
      .then((r) => console.log(r.json()))
      .catch((e) => console.log(e));

    // const requestOptions = {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data: 'Hello from React!' }),
    // };

    // const response = await fetch('http://localhost:5000/api', requestOptions);
    // const data = await response.text();
    // setResponseMessage(data);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleApiRequest}>Send Request</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default App;
