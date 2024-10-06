import Comments from '@/components/Comments';
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
  const { post_title, post_date, initial_post, formatted_comments, summaries, overall_summary } =
    data;

  console.log(overall_summary);

  return (
    <div className="mt-[60px] w-[900px] rounded-md bg-black p-[30px] text-white shadow-lg">
      <div className="mb-[30px] flex w-full flex-col border-b-4 border-white pb-[30px] md:flex-row">
        {/* Post Details */}
        <div className="relative mb-8 w-full md:mb-0 md:w-1/2">
          <time className="absolute right-8 top-[-30px] text-sm text-gray-400">{post_date}</time>
          <h3 className="mb-4 text-2xl font-semibold">{post_title}</h3>
          <p className="text-gray-300">{initial_post}</p>
        </div>
        {/* Overall Summary */}
        <div className="w-full text-red-500 md:w-1/2">
          <h4 className="mb-4 text-xl font-semibold">Overall Summary</h4>
          <div className="prose prose-invert">
            <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
              {overall_summary}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      {/* Comments Section */}
      <Comments formatted_comments={formatted_comments} summaryArray={summaries} />
    </div>
  );
}
