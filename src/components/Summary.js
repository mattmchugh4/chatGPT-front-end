export default function Summary({ summary }) {
  return (
    <div
      style={{
        color: 'red',
        marginRight: '20px',
        borderLeft: '3px solid white',
        paddingLeft: 40,
        width: '50%',
        textAlign: 'center',
      }}
    >
      {summary || null}
    </div>
  );
}
