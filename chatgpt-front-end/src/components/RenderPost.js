import Comments from './Comments';
export default function RenderPost({ data }) {
  console.log('hitRenderPost')
  const {
    post_title,
    post_date,
    initial_post,
    formatted_comments,
    summaries,
    overall_summary,
  } = data;
  return (
    <div
      style={{
        marginTop: 60,
        backgroundColor: 'black',
        color: 'white',
        padding: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          borderBottom: '5px solid white',
          paddingBottom: 30
        }}
      >
        <div style={{ position: 'relative', width: '50%' }}>
          <h4 style={{ position: 'absolute', top: -30, right: 30 }}>
            {post_date}
          </h4>
          <h3>{post_title}</h3>
          <p>{initial_post}</p>
        </div>
        <div style={{ width: '50%', color: 'red' }}>{overall_summary}</div>
      </div>
      <Comments
        formatted_comments={formatted_comments}
        summaryArray={summaries}
      />
    </div>
  );
}
