import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return <Loader text="Loading posts..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1 className="page-title">Blog Posts</h1>
      <div className="post-grid">
        {posts.map((post) => (
          <article key={post.id} className="card">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-preview">
              {post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}
            </p>
            <Link to={`/posts/${post.id}`} className="read-more">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogPosts;
