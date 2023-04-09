import { useEffect, useState } from 'react';

export default function Search({ commentArray }) {
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
    <div>
      <label htmlFor="searchInput">Search: </label>
      <input
        type="text"
        id="searchInput"
        style={{ width: '300px' }}
        onChange={handleInput}
        value={input}
      />
      <button style={{ marginLeft: '10px' }}>Go</button>
    </div>
  );
}
