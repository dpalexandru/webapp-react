import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between">
        {/* Logo */}
        <Link className="navbar-brand racing-title" to="/">
          My Favorite Movies
        </Link>

        {/* Menu */}
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item me-3">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
