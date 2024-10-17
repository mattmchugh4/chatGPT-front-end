import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export interface PostData {
  post_title: string;
  post_date: string;
  initial_post: string;
  formatted_comments: string[][];
  summaries: string[][];
  overall_summary: string;
}

interface RenderPostProps {
  data: PostData;
}

export default function RenderPost({ data }: RenderPostProps) {
  const { post_title, post_date, overall_summary } = data;
  return (
    <div className="mt-8 flex max-w-[85%] flex-col items-center justify-center gap-8 rounded-lg bg-gray-900 p-8 text-white shadow-xl mx-auto">
      {/* Header Section */}
      {/* <div className="mb-6 border-b border-gray-700 pb-4">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Post Title</p>
              <h2 className="text-lg font-medium text-gray-300">{post_title}</h2>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Date Posted</p>
              <time className="text-sm text-gray-500">
                {new Date(post_date).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div> */}
      {/* Summary Section */}
      <div>
        <h3 className="mb-4 text-xl font-semibold text-red-500">Generated Summary</h3>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>{overall_summary}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
