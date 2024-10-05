interface CommentChainProps {
  commentChain: string[];
}

export default function CommentChain({ commentChain }: CommentChainProps) {
  return (
    <div className="mr-5 flex w-1/2 flex-col">
      {commentChain.map((element, index) => {
        const depthMatch = element.match(/(COMMENT|REPLY) (\d+)/);
        const depth = depthMatch ? (depthMatch[1] === 'REPLY' ? Number.parseInt(depthMatch[2]) : 0) : 0;
        const marginLeft = depth * 35;

        // Tailwind's JIT can handle arbitrary values if they follow a consistent pattern.
        // Ensure that the possible margin-left values are included in your content paths for JIT to process them.
        const marginLeftClass = `ml-[${marginLeft}px]`;

        return (
          <div key={index} className={`mt-4 ${marginLeftClass} text-white`}>
            {element}
          </div>
        );
      })}
    </div>
  );
}
