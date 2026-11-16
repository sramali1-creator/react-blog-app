import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import CommentList from '../components/CommentList.jsx';
import CommentForm from '../components/CommentForm.jsx';

const API = 'https://jsonplaceholder.typicode.com';

function PostDetail() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [postError, setPostError] = useState('');
  const [userError, setUserError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  // Fetch the post, then the user who wrote it
  useEffect(() => {
    const controller = new AbortController();
    setLoadingPost(true);
    setPostError('');
    setUserError('');
    setPost(null);
    setUser(null);

    fetch(`${API}/posts/${postId}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return response.json();
      })
      .then((postData) => {
        setPost(postData);
        setLoadingPost(false);

        return fetch(`${API}/users/${postData.userId}`, { signal: controller.signal })
          .then((response) => {
            if (!response.ok) throw new Error(`Status ${response.status}`);
            return response.json();
          })
          .then((userData) => setUser(userData))
          .catch((err) => {
            if (err.name === 'AbortError') return;
            console.error('Error fetching user:', err);
            setUserError('Could not load author information.');
          });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Error fetching post:', err);
        setPostError('Failed to load this post. It may not exist.');
        setLoadingPost(false);
      });

    return () => controller.abort();
  }, [postId]);

  // Fetch the comments for this post
  useEffect(() => {
    const controller = new AbortController();
    setLoadingComments(true);
    setCommentsError('');

    fetch(`${API}/posts/${postId}/comments`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setComments(data);
        setLoadingComments(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Error fetching comments:', err);
        setCommentsError('Failed to load comments.');
        setLoadingComments(false);
      });

    return () => controller.abort();
  }, [postId]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (loadingPost) return <Loader text="Loading post..." />;
  if (postError) {
    return (
      <>
        <ErrorMessage message={postError} />
        <Link to="/posts" className="back-link">← Back to all posts</Link>
      </>
    );
  }

  return (
    <article className="post-detail">
      <Link to="/posts" className="back-link">← Back to all posts</Link>

      <h1 className="post-title">{post.title}</h1>

      <div className="author-box">
        {user ? (
          <>
            <p className="author-name">By {user.name} <span>(@{user.username})</span></p>
            <p>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
            <p>Company: {user.company?.name}</p>
            <p>Website: {user.website}</p>
          </>
        ) : userError ? (
          <p className="field-error">{userError}</p>
        ) : (
          <p>Loading author...</p>
        )}
      </div>

      <p className="post-body">{post.body}</p>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        {loadingComments ? (
          <Loader text="Loading comments..." />
        ) : commentsError ? (
          <ErrorMessage message={commentsError} />
        ) : (
          <CommentList comments={comments} />
        )}

        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </section>
    </article>
  );
}

export default PostDetail;
