import React, { useState } from 'react';

const Login = () => {
  // Definir los estados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función de manejo de inicio de sesión
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
      } else {
        alert('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Correo Electrónico"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
