import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero">
      <h1>Welcome to the React Blog</h1>
      <p>
        Read posts, see who wrote them, and join the conversation in the comments.
      </p>
      <Link to="/posts" className="btn">Browse Blog Posts</Link>
    </section>
  );
}

export default Home;
