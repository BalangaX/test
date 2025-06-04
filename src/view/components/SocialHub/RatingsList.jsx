const RatingsList = ({ posts }) => (
  <div>
    {posts.map((p, idx) => (
      <div key={idx}>{p} - 👍 0</div>
    ))}
  </div>
);

export default RatingsList;
