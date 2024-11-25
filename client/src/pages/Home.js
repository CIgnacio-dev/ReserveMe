import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSpaces, deleteSpace } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      if (!token) {
        setErrorMessage('Debes iniciar sesión para ver los espacios disponibles.');
        return;
      }

      try {
        const data = await getSpaces(token);
        setSpaces(data);
        setFilteredSpaces(data);
        setErrorMessage(''); // Limpiar mensaje de error si ya tiene acceso
      } catch (error) {
        setErrorMessage('Error al obtener los espacios.');
      }
    };

    fetchSpaces();
  }, [token]);

  useEffect(() => {
    // Filtrar espacios por nombre y capacidad
    const filtered = spaces.filter((space) => {
      return (
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCapacity ? space.capacity >= filterCapacity : true)
      );
    });
    setFilteredSpaces(filtered);
  }, [searchTerm, filterCapacity, spaces]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este espacio?')) {
      try {
        await deleteSpace(token, id);
        setSpaces((prev) => prev.filter((space) => space._id !== id));
        alert('Espacio eliminado');
      } catch (error) {
        alert('Error al eliminar el espacio');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Espacios Disponibles</h2>
        {role === 'admin' && token && (
          <button
            className="btn btn-success"
            onClick={() => navigate('/create-space')}
          >
            Crear Nuevo Espacio
          </button>
        )}
      </div>
      {errorMessage ? (
        <div className="alert alert-warning">{errorMessage}</div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="form-control mb-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select"
              value={filterCapacity}
              onChange={(e) => setFilterCapacity(e.target.value)}
            >
              <option value="">Filtrar por capacidad</option>
              <option value="10">10 o más personas</option>
              <option value="20">20 o más personas</option>
              <option value="30">30 o más personas</option>
            </select>
          </div>
          <ul className="list-group">
            {filteredSpaces.map((space) => (
              <li
                key={space._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{space.name}</strong>: {space.description} (Capacidad: {space.capacity})
                </div>
                <div>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => navigate(`/reserve-space/${space._id}`)}
                  >
                    Reservar
                  </button>
                  {role === 'admin' && (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => navigate(`/edit-space/${space._id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(space._id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
