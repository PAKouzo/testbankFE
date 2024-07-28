import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light p-3">
      <div className="container">
        <h1 className="text-center">All Rights Reserved &copy; Technology</h1>
        <nav className="text-center mt-3">
          <Link to="/about" className="footer-link">
            About
          </Link>
          <span>|</span>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <span>|</span>
          <Link to="/policy" className="footer-link">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
