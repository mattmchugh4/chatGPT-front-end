'use client';

import RenderPost, { type PostData } from '@/components/RenderPost';
import type { ChangeEvent} from 'react';
import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';

interface MakeRequestProps {
  socket: Socket;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  // Add other relevant fields
}

interface CommentData {
  formatted_comments: Comment[];
  // Add other relevant fields if necessary
}

export default function MakeRequest({ socket }: MakeRequestProps) {
  const [data, setData] = useState<CommentData | null>(null);
  const [input, setInput] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRequest = () => {
    if (!input.trim()) {return;}
    setData(null);
    setError('');
    socket.emit('searchUrl', { inputUrl: input });
  };

  useEffect(() => {
    const handleCommentData = (responseData: CommentData) => {
      setData(responseData);
    };

    const handleStatusMessage = (statusMessage: string) => {
      setStatus(statusMessage);
    };

    const handleError = (errorData: { message: string }) => {
      setError(errorData.message);
    };

    socket.on('comment-data', handleCommentData);
    socket.on('status-message', handleStatusMessage);
    socket.on('error', handleError);

    return () => {
      socket.off('comment-data', handleCommentData);
      socket.off('status-message', handleStatusMessage);
      socket.off('error', handleError);
    };
  }, [socket]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      {/* Status Message */}
      {status && (
        <div className="mb-4">
          <span className="block text-sm text-gray-700">{status}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4">
          <span className="block text-sm text-red-500">{error}</span>
        </div>
      )}

      {/* Input Section */}
      <div className="mb-6 flex items-center">
        <label htmlFor="urlInput" className="mr-2 text-gray-700">
          Reddit URL:
        </label>
        <input
          type="text"
          id="urlInput"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInput}
          value={input}
          placeholder="https://www.reddit.com/r/example/comments/..."
        />
        <button
          onClick={handleRequest}
          disabled={!input.trim()}
          className={`ml-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            input.trim() ? '' : 'cursor-not-allowed opacity-50'
          }`}
        >
          Request
        </button>
      </div>

      {/* Render Post Section */}
      <div className="flex flex-col items-center justify-center gap-8">
        {data && data.formatted_comments.length > 0 && <RenderPost data={data as PostData} />}
      </div>
    </div>
  );
}
