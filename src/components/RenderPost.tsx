import type { PostData } from '@/components/SocketApp';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
export interface PostData1 {
  post_title: string;
  post_date: string;
  initial_post: string;
  formatted_comments: string[][];
  summaries: string[][];
  overall_summary: string;
}

interface RenderPostProps {
  data: any;
  postData: PostData;
}

export default function RenderPost({ data, postData }: RenderPostProps) {
  return (
    <div className="mx-auto mb-10 flex h-[80%] w-[85%] flex-col items-start justify-start gap-8 overflow-y-auto rounded-lg bg-gray-900 p-8 text-white shadow-xl">
      {/* Header Section */}
      <div className="w-full border-b border-gray-700 pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mt-1 text-sm text-gray-400">Reddit Post Title</p>
            <h2 className="text-2xl font-bold text-white">{postData.post_title}</h2>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-gray-500">Post Date</p>
            <time className="text-sm font-medium text-gray-400">
              {new Date(postData.post_date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <h3 className="text-xl font-semibold text-orange-600">Generated Summary</h3>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
          {data.overall_summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}
