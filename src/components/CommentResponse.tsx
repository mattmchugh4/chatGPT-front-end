import RenderPost from '@/components/RenderPost';

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

export default function CommentResponse({ data }: ResponseProps) {
  return (
    <div className="min-h-0 w-full flex-1">
      <div className="h-full overflow-y-auto">
        {data && data.formatted_comments.length > 0 && <RenderPost data={data as any} />}
      </div>
    </div>
  );
}
