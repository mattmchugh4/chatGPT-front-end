import { useEffect, useState } from 'react';
import Search from './Search';
import Comments from './Comments';
import RenderPost from './RenderPost';

export default function HttpCall() {
  const [data, setData] = useState('');
  const [input, setInput] = useState('');

  const handleRequest = () => {
    setData('')
    fetch('/http-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: input }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        console.log(responseData);
      });
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      {/* <Search /> */}
      <input
        type="text"
        style={{ width: '300px' }}
        onChange={handleInput}
        value={input}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleRequest}>Request</button>
      </div>

      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          gap: '50px',
        }}
      >
        {data.formatted_comments ? <RenderPost data={data} /> : null}
      </div>
    </>
  );
}
