export default function CommentChain({ commentChain }) {
  return (
    <div
      style={{
        display: 'flex',
        marginRight: '20px',
        flexDirection: 'column',
        width: '50%',
      }}
    >
      {commentChain.map((element, index) => {
        const depthMatch = element.match(/(COMMENT|REPLY) (\d+)/);
        const depth = depthMatch
          ? depthMatch[1] === 'REPLY'
            ? parseInt(depthMatch[2])
            : 0
          : 0;
        const marginLeft = depth * 35;
        return (
          <div
            key={index}
            style={{
              marginTop: '15px',
              marginLeft: `${marginLeft}px`,
              color: 'white',
            }}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
}
