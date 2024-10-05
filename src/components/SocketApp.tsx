'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MakeRequest from './MakeRequest';
import Search from './Search';

export default function SocketApp() {
  const [socketInstance, setSocketInstance] = useState(null);
  const [isConnected, setConnection] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:5001/', {
      transports: ['websocket'],
      cors: {
        origin: 'http://localhost:3000/',
      },
    });

    setSocketInstance(socket);

    socket.on('connect', () => {
      console.log('Connected');
      setConnection(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      setConnection(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-full w-full justify-center">
      <h1 className="my-4 text-4xl font-bold">TL;DR: Reddit Thread Summarizer</h1>
      <div className="flex justify-center">
        {isConnected && <MakeRequest socket={socketInstance} />}
        {isConnected && <Search socket={socketInstance} />}
      </div>
    </div>
  );
}
