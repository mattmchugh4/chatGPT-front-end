import { useEffect, useState } from 'react';
import Search from './Search';
import Comments from './Comments';

export default function HttpCall() {
  const [data, setData] = useState('');
  const [input, setInput] = useState('');

  const handleRequest = () => {
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
      <Search />
      <input
        type="text"
        style={{ width: '300px' }}
        onChange={handleInput}
        value={input}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleRequest}>Request</button>
      </div>
      <h2>Response</h2>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          gap: '50px',
        }}
      >
        <div style={{ backgroundColor: 'black', width: '700px' }}>
          {data.commentArray ? (
            <Comments
              commentArray={data.commentArray}
              summaryArray={data.summaries}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
