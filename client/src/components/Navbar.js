import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ReserveMe
        </Link>
        <div>
          {isAuthenticated ? (
            <button className="btn btn-danger" onClick={logout}>
              Cerrar Sesión
            </button>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
