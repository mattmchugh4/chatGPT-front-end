import { useEffect, useState } from 'react';
import Comments from './Comments';
import RenderPost from './RenderPost';

export default function MakeRequest({ socket }) {
  const [data, setData] = useState('');
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');

  const handleRequest = () => {
    setData('');
    socket.emit('searchUrl', { inputUrl: input });
  };

  useEffect(() => {
    socket.on('comment-data', (responseData) => {
      setData(responseData);
    });

    socket.on('status-message', (statusMessage) => {
      setStatus(statusMessage);
    });

    return () => {
      socket.off('comment-data');
    };
  }, [socket]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <span>{status}</span>
      <label htmlFor="urlInput">Paste in Reddit URL to summarize: </label>
      <input
        type="text"
        id="urlInput"
        style={{ width: '300px' }}
        onChange={handleInput}
        value={input}
      />
      <button onClick={handleRequest} style={{ marginLeft: '10px' }}>
        Request
      </button>
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
