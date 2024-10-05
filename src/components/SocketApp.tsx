'use client';

import MakeRequest from '@/components/MakeRequest';
import Search from '@/components/Search';
import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

export default function SocketApp() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket only once
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5001', {
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('Connected');
      });

      socketRef.current.on('connected', (data) => {
        console.log('Connected Event from Server:', data);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected');
      });

      socketRef.current.on('connect_error', (err) => {
        console.error('Connection Error:', err);
      });
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="my-4 text-4xl font-bold">TL;DR: Reddit Thread Summarizer</h1>
      <div className="flex flex-col items-center justify-center">
        {socketRef.current && <MakeRequest socket={socketRef.current} />}
        {socketRef.current && <Search socket={socketRef.current} />}
      </div>
    </div>
  );
}
