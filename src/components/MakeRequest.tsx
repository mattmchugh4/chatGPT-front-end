'use client';

import RenderPost from '@/components/RenderPost';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';

interface MakeRequestProps {
  socket: Socket;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Summary {
  content: string;
  tokens: number;
}

interface CommentData {
  formatted_comments: Comment[][];
  initial_post: string;
  post_date: string;
  post_title: string;
  overall_summary: string;
  summaries: Summary[];
  tokens: number;
}

export default function MakeRequest({ socket }: MakeRequestProps) {
  const [data, setData] = useState<CommentData | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRequest = () => {
    if (!urlInput.trim() && !question.trim()) {
      return;
    }
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
    <div className="flex w-full flex-grow flex-col items-center justify-start overflow-auto">
      <div className="w-1/3 rounded-lg bg-white p-6 shadow-md">
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
            className={`rounded-md bg-[#FF7F50] px-4 py-2 text-white hover:bg-[#E65C2A] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !urlInput.trim() && !question.trim() ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Submit
          </button>
        </div>
      </div>
      {/* Status Message */}
      {status && status !== 'Response complete' && (
        <div className="mb-4">
          <span className="text-md block italic text-black">{status}</span>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="mb-4">
          <span className="block text-sm text-red-500">{error}</span>
        </div>
      )}
      {data && data.formatted_comments.length > 0 && <RenderPost data={data as any} />}
    </div>
  );
}
