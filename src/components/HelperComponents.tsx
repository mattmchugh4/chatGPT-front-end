import { PropagateLoader } from 'react-spinners';
import type { Socket } from 'socket.io-client';
import Typewriter from 'typewriter-effect';

import type { CommentData } from '@/components/CommentResponse';
import CommentResponse from '@/components/CommentResponse';
import MakeRequest from '@/components/MakeRequest';
import { AppState } from '@/components/SocketApp';

export function SearchView({ socket, onStart }: { socket: Socket | null; onStart: () => void }) {
  return (
    <>
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
      <MakeRequest socket={socket} setAppState={onStart} />
    </>
  );
}

export function LoadingView() {
  return (
    <div className="mt-6 flex h-[calc(100vh_-_9.5rem)] w-full flex-col items-center">
      <div className="flex w-1/3 items-center justify-center rounded-lg border border-gray-600 bg-white p-6 shadow-md">
        <PropagateLoader color={'#FF7F50'} loading={true} size={15} />
      </div>
    </div>
  );
}

export function CompleteView({
  data,
  setAppState,
}: {
  data: CommentData;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}) {
  return (
    <>
      <button
        onClick={() => setAppState(AppState.Search)}
        className="mt-4 rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
      >
        Summarize Again
      </button>
      <CommentResponse data={data} />
    </>
  );
}

export function ErrorView({ error }: { error: string }) {
  return (
    <div className="mb-4">
      <span className="block text-sm text-red-500">{error}</span>
    </div>
  );
}
