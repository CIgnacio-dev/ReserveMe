import { useEffect, useState } from 'react';
import { getSpaces } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [spaces, setSpaces] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
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
      console.log('Respuesta del servidor:', data);
  
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
      } else {
        alert('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
    }
  };
  
  
  
  
  
  

  // Verificar si el token está disponible al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Obtener espacios solo si el usuario está autenticado
  useEffect(() => {
    const fetchSpaces = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token no disponible. Por favor, inicia sesión.');
        return;
      }

      try {
        const data = await getSpaces(token);
        setSpaces(data);
      } catch (error) {
        console.error('Error al obtener los espacios:', error);
      }
    };

    if (isAuthenticated) {
      fetchSpaces();
    }
  }, [isAuthenticated]);

  return (
    <div>
  {!isAuthenticated ? (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin()}>Iniciar Sesión</button>
    </div>
  ) : (
    <div>
      <h2>Espacios Disponibles</h2>
      <ul>
        {spaces.map((space) => (
          <li key={space._id}>{space.name}</li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
};

export default Home;
