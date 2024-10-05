interface SummaryProps {
  summary: string;
}
export default function Summary({ summary }: SummaryProps) {
  return (
    <div className="mr-5 w-full border-l-[3px] border-white pl-10 text-center text-red-500 md:w-1/2">
      {summary || null}
    </div>
  );
}
