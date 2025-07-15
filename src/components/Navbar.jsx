import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <Link to="/" className="font-bold text-xl">Mini Zillow</Link>
    <div className="space-x-4">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/admin">Admin</Link>
    </div>
  </nav>
);

export default Navbar;
