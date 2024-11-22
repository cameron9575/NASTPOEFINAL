import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Sodnan</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/manage-menu">Manage Menu</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
