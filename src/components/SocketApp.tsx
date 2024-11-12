'use client';

import type { CommentData } from '@/components/CommentResponse';
import CommentResponse from '@/components/CommentResponse';
import MakeRequest from '@/components/MakeRequest';
import { useEffect, useRef, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { io, type Socket } from 'socket.io-client';
import Typewriter from 'typewriter-effect';

export enum AppState {
  Search = 'search',
  Loading = 'loading',
  Streaming = 'streaming',
  Complete = 'complete',
}

export default function SocketApp() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setConnection] = useState(false);
  const [appState, setAppState] = useState<AppState>(AppState.Search);
  const [data, setData] = useState<CommentData | null>(null);
  console.log(data);
  useEffect(() => {
    // Initialize socket only once
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5001', {
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        setConnection(true);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
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
      {appState === AppState.Search && (
        <>
          <div className="h-[15%]"></div>
          <h1 className="my-4 text-5xl font-bold text-[#FF7F50]">
            TL;DR: Reddit Thread Summarizer
          </h1>
          <div className="mt-2 text-xl text-gray-700">
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
          <MakeRequest socket={socketRef.current} setAppState={setAppState} setData={setData} />
        </>
      )}

      {appState === AppState.Loading && (
        <div className="mt-6 flex h-[calc(100vh_-_9.5rem)] w-full flex-col items-center">
          <div className="flex w-1/3 items-center justify-center rounded-lg border border-gray-600 bg-white p-6 shadow-md">
            <PropagateLoader color={'#FF7F50'} loading={true} size={15} />
            {/* Orange PropagateLoader */}
          </div>
        </div>
      )}

      {appState === AppState.Complete && data && <CommentResponse data={data} />}
    </div>
  );
}
