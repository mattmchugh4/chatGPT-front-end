'use client';

import type { CommentData } from '@/components/CommentResponse';
import { CompleteView, ErrorView, LoadingView, SearchView } from '@/components/HelperComponents';
import { useSocket } from '@/components/useSockets';
import { useCallback, useState } from 'react';

export enum AppState {
  Search = 'search',
  Loading = 'loading',
  Streaming = 'streaming',
  Complete = 'complete',
  Error = 'error',
}

export default function SocketApp() {
  const [appState, setAppState] = useState<AppState>(AppState.Search);
  const [data, setData] = useState<CommentData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCommentData = useCallback((responseData: CommentData) => {
    setData(responseData);
    setAppState(AppState.Complete);
  }, []);

  const handleStatusMessage = useCallback((message: string) => {
    setStatusMessage(message);
    if (message === 'Response complete') {
      setAppState(AppState.Complete);
    } else {
      setAppState(AppState.Loading);
    }
  }, []);

  const handleError = useCallback((errorMsg: string) => {
    setError(errorMsg);
    setAppState(AppState.Error);
  }, []);

  const socket = useSocket(
    'http://localhost:5001',
    handleCommentData,
    handleStatusMessage,
    handleError,
  );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-500">
      <div className="h-[10%]"></div>
      <h1 className="my-4 text-5xl font-bold text-[#FF7F50]">TL;DR: Reddit Thread Summarizer</h1>
      {appState === AppState.Search && (
        <SearchView socket={socket} onStart={() => setAppState(AppState.Loading)} />
      )}
      {appState === AppState.Loading && <LoadingView />}
      {statusMessage && statusMessage !== 'Response complete' && (
        <div className="mb-4">
          <span className="text-md block italic text-black">{statusMessage}</span>
        </div>
      )}
      {appState === AppState.Complete && data && (
        <CompleteView data={data} setAppState={setAppState} />
      )}
      {appState === AppState.Error && <ErrorView error={error} />}
    </div>
  );
}
