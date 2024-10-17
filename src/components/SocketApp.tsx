'use client';

import MakeRequest from '@/components/MakeRequest';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import Typewriter from 'typewriter-effect';

export default function SocketApp() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setConnection] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);

  useEffect(() => {
    // Initialize socket only once
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5001', {
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        setConnection(true);
      });

      socketRef.current.on('disconnect', () => {
        setConnection(false);
      });

      socketRef.current.on('connect_error', (err) => {
        console.error('Connection Error:', err);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-500">
      {isInitialSearch && (
        <>
          <div className="h-[15%]"></div>
          <h1 className="my-4 text-5xl font-bold text-[#FF7F50]">
            TL;DR: Reddit Thread Summarizer
          </h1>
          <div className=" mt-2 text-xl text-gray-700">
            <Typewriter
              options={{
                strings: [
                  'Summarize lengthy Reddit threads in seconds.',
                  'Get the gist without scrolling endlessly.',
                  'Your time is valuable—save it with concise summaries.',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </>
      )}

      <MakeRequest socket={socketRef.current} setIsInitialSearch={setIsInitialSearch} />
    </div>
  );
}
