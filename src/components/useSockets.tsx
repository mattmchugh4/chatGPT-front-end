import type { CommentData } from '@/components/MakeRequest';
import type { PostData1 } from '@/components/RenderPost';
import { useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

export const useSocket = (
  url: string,
  onCommentData: (data: CommentData) => void,
  onStatusMessage: (message: string) => void,
  onError: (error: string) => void,
  onStreamResponse: (chunk: string) => void,
  onPostData: (data: PostData1) => void,
): { isConnected: boolean; socket: Socket | null } => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Initialize socket connection
    const socket = io(url, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err);
      onError('Connection failed. Please try again.');
    });

    // Event listeners
    socket.on('comment-data', onCommentData);
    socket.on('status-message', onStatusMessage);
    socket.on('stream-response', onStreamResponse);
    socket.on('post-data', onPostData);
    socket.on('error', (err: { message: string }) => onError(err.message));

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url, onCommentData, onStatusMessage, onError, onStreamResponse, onPostData]);

  return {
    isConnected,
    socket: socketRef.current,
  };
};
