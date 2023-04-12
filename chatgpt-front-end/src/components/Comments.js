import CommentChain from './CommentChain';
import Summary from './Summary';

export default function Comments({ formatted_comments, summaryArray }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '10px',
      }}
    >
      {formatted_comments.map((commentChain, chainIndex) => (
        <div
          key={chainIndex}
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'left',
            borderBottom: '3px solid white',
            paddingBottom: '10px',
            marginBottom: '10px',
          }}
        >
          <CommentChain commentChain={commentChain} />
          <Summary summary={summaryArray[chainIndex]} />
        </div>
      ))}
    </div>
  );
}
