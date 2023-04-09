export default function Comments({ commentArray, summaryArray }) {
  return commentArray.map((commentChain, chainIndex) => (
    <div
      key={chainIndex}
      style={{
        borderBottom:
          chainIndex < commentArray.length - 1 ? '1px solid white' : '',
        paddingBottom: '10px',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          color: 'red',
        }}
      >
        {summaryArray[chainIndex] || null}
      </div>
      <div>
        {commentChain.map((element, index) => {
          const depthMatch = element.match(/(COMMENT|REPLY) (\d+)/);
          const depth = depthMatch
            ? depthMatch[1] === 'REPLY'
              ? parseInt(depthMatch[2])
              : 0
            : 0;
          const marginLeft = depth * 30; // Adjust the multiplier to control the indentation
          return (
            <div
              key={`${chainIndex}-${index}`}
              style={{
                marginTop: '10px',
                marginLeft: `${marginLeft}px`,
                color: 'white',
              }}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  ));
}
