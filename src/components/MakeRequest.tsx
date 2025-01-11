'use client';

import { AppState } from '@/components/SocketApp';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { Socket } from 'socket.io-client';

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

export interface CommentData {
  formatted_comments: Comment[][];
  initial_post: string;
  post_date: string;
  post_title: string;
  overall_summary: string;
  summaries: Summary[];
  tokens: number;
}
interface ResponseProps {
  data: CommentData;
}
interface MakeRequestProps {
  socket: Socket | null;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export default function MakeRequest({ socket, setAppState }: MakeRequestProps) {
  const [urlInput, setUrlInput] = useState<string>(
    'https://www.reddit.com/r/FoodNYC/comments/1d28xsr/recommendations_for_nyc_hidden_gems/',
  );
  const [question, setQuestion] = useState<string>(
    'Can you provide some top food recommendations from this post that people suggest in NYC?',
  );
  const [isInteracted, setIsInteracted] = useState<boolean>(false);

  const handleRequest = () => {
    if (!urlInput.trim() && !question.trim()) {
      return;
    }
    setAppState(AppState.Loading);
    socket?.emit('searchUrlAndQuestion', { inputUrl: urlInput, userQuestion: question });
  };

  const handleInteraction = () => {
    if (!isInteracted) {
      setUrlInput('');
      setQuestion('');
      setIsInteracted(true);
    }
  };

  const handleUrlInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleInteraction();
    setUrlInput(event.target.value);
  };

  const handleQuestionInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleInteraction();
    setQuestion(event.target.value);
  };

  return (
    <div className="mt-6 flex h-[calc(100vh_-_9.5rem)] w-full flex-col items-center">
      <div className="w-1/3 rounded-lg border border-gray-600 bg-white p-6 shadow-md">
        <div className="mb-6">
          <label htmlFor="urlInput" className="mb-2 block text-gray-700">
            Reddit URL:
          </label>
          <input
            type="text"
            id="urlInput"
            className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
            onChange={handleUrlInput}
            onFocus={handleInteraction}
            value={urlInput}
            placeholder="https://www.reddit.com/r/example/..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="questionInput" className="mb-2 block text-gray-700">
            Ask ChatGPT:
          </label>
          <textarea
            id="questionInput"
            className={`w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleQuestionInput}
            onFocus={handleInteraction}
            value={question}
            // placeholder="Type your question for ChatGPT here..."
            rows={4}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleRequest}
            disabled={!urlInput.trim() && !question.trim()}
            className={`rounded-md bg-[#FF7F50] px-4 py-2 text-white hover:bg-[#E65C2A] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !urlInput.trim() && !question.trim() ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isInteracted ? 'Submit' : 'Try it'}
          </button>
        </div>
      </div>
    </div>
  );
}
