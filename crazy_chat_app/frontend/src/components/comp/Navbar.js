import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authenticated }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          CrazyChat
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="" className="nav-link">
                Home
              </Link>
            </li>
            {!authenticated ? (
              <>
                <li className="nav-item active">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link to="/sign-up" className="nav-link">
                    SignUp
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>

                <li className="nav-item active">
                  <span className="nav-link">
                    Welcome, '{localStorage.getItem("username")}'
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
