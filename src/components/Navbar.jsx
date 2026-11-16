import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">React Blog</NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/posts">Blog Posts</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
