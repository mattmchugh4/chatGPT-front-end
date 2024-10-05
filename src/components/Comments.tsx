import CommentChain from '@/components/CommentChain';
import Summary from '@/components/Summary';

interface CommentChainData {
  id: string;
  author: string;
  content: string;
}

interface SummaryData {
  id: string;
  summary: string;
}

interface CommentsProps {
  formatted_comments: string[][];
  summaryArray: string[][];
}

export default function Comments({ formatted_comments, summaryArray }: CommentsProps) {
  return (
    <div className="flex flex-col items-start p-2.5 text-left">
      {formatted_comments.map((commentChain, chainIndex) => (
        <div
          key={`commentChain-${chainIndex}`}
          className="mb-2.5 flex w-full justify-start border-b-2 border-gray-200 pb-2.5"
        >
          <CommentChain commentChain={commentChain} />
          <Summary summary={summaryArray[chainIndex]?.[0] || 'No summary available.'} />
        </div>
      ))}
    </div>
  );
}
