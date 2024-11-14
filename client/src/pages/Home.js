import { useEffect, useState } from 'react';
import { getSpaces } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [spaces, setSpaces] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    setLoading(true);
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
        setIsAuthenticated(true);
        alert('Inicio de sesión exitoso');
        navigate('/'); // Redireccionar al home
      } else {
        alert('Inicio de sesión fallido. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      alert('Error en el inicio de sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Verificar si el token está disponible y autenticar al cargar la página
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
        alert('No se pudieron obtener los espacios. Intenta nuevamente.');
      }
    };

    if (isAuthenticated) {
      fetchSpaces();
    }
  }, [isAuthenticated]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setSpaces([]);
    alert('Has cerrado sesión.');
  };

  return (
    <div>
      {!isAuthenticated ? (
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
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Espacios Disponibles</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
          {spaces.length > 0 ? (
            <ul>
              {spaces.map((space) => (
                <li key={space._id}>
                  <strong>{space.name}</strong>: {space.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay espacios disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
