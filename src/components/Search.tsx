import type { ChangeEvent, MouseEvent} from 'react';
import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';

interface SearchProps {
  socket: Socket;
}

type SearchResult = [string, string]; // [title, url]

export default function Search({ socket }: SearchProps) {
  const [input, setInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSearch = () => {
    if (!input.trim()) {return;}
    setSearchResults([]);
    setStatus('');
    setError('');
    socket.emit('search', { searchQuery: input });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (socket) {
      const handleSearchResult = (data: { result: SearchResult }) => {
        console.log('Received search result:', data.result);
        setSearchResults((prevResults) => [...prevResults, data.result]);
      };

      const handleStatusMessage = (statusMessage: string) => {
        setStatus(statusMessage);
      };

      const handleError = (errorData: { message: string }) => {
        setError(errorData.message);
      };

      socket.on('search_result', handleSearchResult);
      socket.on('status-message', handleStatusMessage);
      socket.on('error', handleError);

      return () => {
        socket.off('search_result', handleSearchResult);
        socket.off('status-message', handleStatusMessage);
        socket.off('error', handleError);
      };
    }
  }, [socket]);

  const handleLinkClick = (event: MouseEvent<HTMLButtonElement>, link: string) => {
    event.preventDefault();
    socket.emit('searchUrl', { inputUrl: link });
  };

  return (
    <div className="mt-2.5">
      {/* Label and Input Section */}
      <label htmlFor="searchInput" className="mb-2 block text-gray-700">
        Or perform Reddit search:
      </label>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          id="searchInput"
          className="w-[300px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInput}
          value={input}
          placeholder="Search Reddit..."
        />
        <button
          onClick={handleSearch}
          disabled={!input.trim()}
          className={`ml-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            input.trim() ? '' : 'cursor-not-allowed opacity-50'
          }`}
        >
          Go
        </button>
      </div>

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

      {/* Search Results */}
      <div className="text-left">
        <ul>
          {searchResults.map(([title, url], index) => (
            <li key={index} className="mb-2">
              <button
                onClick={(event) => handleLinkClick(event, url)}
                className="font-inherit cursor-pointer border-none bg-none text-base text-blue-500 underline"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
