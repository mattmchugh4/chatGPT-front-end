import { useEffect, useState } from 'react';

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

  const commentElement = data
    ? data.comments.formatted_comments.map((commentChain, chainIndex) => (
        <div
          key={chainIndex}
          style={{
            borderBottom:
              chainIndex < data.comments.formatted_comments.length - 1 ? '1px solid white' : '',
            paddingBottom: '10px',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              color: 'red',
            }}
          >
            {data.summaries[chainIndex] || null}
          </div>
          <div>
            {commentChain.map((element, index) => {
              const depthMatch = element.match(/(COMMENT|REPLY) (\d+)/);
              const depth = depthMatch
                ? depthMatch[1] === 'REPLY'
                  ? parseInt(depthMatch[2])
                  : 0
                : 0;
              const marginLeft = depth * 30; // Adjust the multiplier to control the indentation
              return (
                <div
                  key={`${chainIndex}-${index}`}
                  style={{
                    marginTop: '10px',
                    marginLeft: `${marginLeft}px`,
                    color: 'white',
                  }}
                >
                  {element}
                </div>
              );
            })}
          </div>
        </div>
      ))
    : null;

  return (
    <>
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
      {/* {data ? (
        data.search_results.map((element, index) => (
          <div key={index}>
            <span>{element}</span>
          </div>
        ))
      ) : (
        <div />
      )} */}
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          gap: '50px',
        }}
      >
        <div style={{ backgroundColor: 'black', width: '700px' }}>
          {commentElement}
        </div>
      </div>
    </>
  );
}
