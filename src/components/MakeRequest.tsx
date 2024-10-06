'use client';

import RenderPost from '@/components/RenderPost';
import { ChangeEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

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
  const [urlInput, setUrlInput] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  console.log('MakeRequest rendered');

  const handleRequest = () => {
    if (!urlInput.trim() && !question.trim()) return;
    setData(null);
    setError('');
    socket.emit('searchUrlAndQuestion', { inputUrl: urlInput, userQuestion: question });
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

  const handleUrlInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const handleQuestionInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
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

      {/* URL Input Section */}
      <div className="mb-6">
        <label htmlFor="urlInput" className="mb-2 block text-gray-700">
          Reddit URL:
        </label>
        <input
          type="text"
          id="urlInput"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleUrlInput}
          value={urlInput}
          placeholder="https://www.reddit.com/r/example/comments/..."
        />
      </div>

      {/* ChatGPT Question Input Section */}
      <div className="mb-6">
        <label htmlFor="questionInput" className="mb-2 block text-gray-700">
          Ask ChatGPT:
        </label>
        <textarea
          id="questionInput"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleQuestionInput}
          value={question}
          placeholder="Type your question for ChatGPT here..."
          rows={4}
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleRequest}
          disabled={!urlInput.trim() && !question.trim()}
          className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !urlInput.trim() && !question.trim() ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Submit
        </button>
      </div>

      {/* Render Post Section */}
      <div className="flex flex-col items-center justify-center gap-8">
        {data && data.formatted_comments.length > 0 && <RenderPost data={data as any} />}
      </div>
    </div>
  );
}
