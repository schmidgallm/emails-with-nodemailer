import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      Navbar
    </a>
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
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://github.com/schmidgallm/emails-with-nodemailer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Code
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://nodemailer.com/about/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NodeMailer Docs
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
