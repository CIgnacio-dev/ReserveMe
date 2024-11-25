import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api'; // Importa loginUser
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Contexto de autenticación
  const navigate = useNavigate(); // Hook para redirección

  // Maneja el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    try {
      const { token, role } = await loginUser(email, password); // Desestructurar token y rol
      login(token, role); // Guardar token y rol en el contexto
      localStorage.setItem('token', token); // Guardar token en localStorage
      navigate('/'); // Redirigir al home
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
