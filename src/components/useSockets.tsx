import type { CommentData } from '@/components/MakeRequest';
import React, { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export const useSocket = (
  url: string,
  onCommentData: (data: CommentData) => void,
  onStatusMessage: (message: string) => void,
  onError: (error: string) => void,
  onStreamResponse: (chunk: string) => void,
): Socket | null => {
  const socketRef = React.useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url, {
      transports: ['websocket'],
    });

    // socketRef.current.onAny((event, ...args) => {
    //   console.log(`Received event: ${event}`, args);
    // });

    // Connection events
    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Connection Error:', err);
      onError('Connection failed. Please try again.');
    });

    // Event listeners
    socketRef.current.on('comment-data', onCommentData);
    socketRef.current.on('status-message', onStatusMessage);
    socketRef.current.on('stream-response', onStreamResponse); 
    socketRef.current.on('error', (err: { message: string }) => onError(err.message));

    // Cleanup on unmount
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [url, onCommentData, onStatusMessage, onError, onStreamResponse]);

  return socketRef.current;
};
