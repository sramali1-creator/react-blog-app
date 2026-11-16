function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p className="empty">No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.clientKey ?? comment.id} className="comment">
          <p className="comment-name">{comment.name}</p>
          <p className="comment-body">{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
