import './App.css';
import MakeRequest from './components/MakeRequest';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import Search from './components/Search';

function App() {
  const [socketInstance, setSocketInstance] = useState('');
  const [isConnected, setConnection] = useState(false);

  useEffect(() => {
    console.log('effectHit');
    const socket = io('localhost:5001/', {
      transports: ['websocket'],
      cors: {
        origin: 'http://localhost:3000/',
      },
    });

    setSocketInstance(socket);

    socket.on('connect', (data) => {
      console.log(data);
    });

    setConnection(true);

    socket.on('disconnect', (data) => {
      console.log(data);
    });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>TL;DR: Reddit Thread Summarizer </h1>
      <div className="line">
        {isConnected && <MakeRequest socket={socketInstance} />}
        {isConnected && <Search socket={socketInstance} />}
      </div>
    </div>
  );
}

export default App;
