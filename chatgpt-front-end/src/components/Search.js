import { useEffect, useState } from 'react';

export default function Search({ socket }) {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setSearchResults([]);
    socket.emit('search', { searchQuery: input });
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (socket) {
      socket.on('search_result', (data) => {
        console.log('Received search result:', data.result);
        setSearchResults((prevResults) => [...prevResults, data.result]);
      });

      return () => {
        socket.off('search_result');
      };
    }
  }, [socket]);

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    console.log('Link clicked:', link);
    // Add your event handler logic here
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  };

  return (
    <div>
      <label htmlFor="searchInput">Or perform search: </label>
      <input
        type="text"
        id="searchInput"
        style={{ width: '300px' }}
        onChange={handleInput}
        value={input}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Go
      </button>
      <div style={{ textAlign: 'left' }}>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <button
                style={linkButtonStyle}
                onClick={(event) => handleLinkClick(event, result[0])}
              >
                {result[0]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
