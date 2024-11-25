import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSpaces, deleteSpace } from '../utils/api'; // Importa correctamente
import { useNavigate } from 'react-router-dom';

const AdminSpaces = () => {
  const [spaces, setSpaces] = useState([]); // Estado para los espacios
  const { token } = useContext(AuthContext); // Obtener token del contexto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await getSpaces(token); // Obtiene todos los espacios
        setSpaces(data); // Actualiza el estado con los espacios
      } catch (error) {
        console.error('Error al obtener los espacios:', error);
        alert('Error al obtener los espacios');
      }
    };

    fetchSpaces(); // Llama a la función para obtener los espacios
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este espacio?')) {
      try {
        await deleteSpace(token, id); // Llama a la API para eliminar el espacio
        setSpaces((prevSpaces) => prevSpaces.filter((space) => space._id !== id)); // Actualiza el estado
        alert('Espacio eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar el espacio:', error);
        alert('Error al eliminar el espacio');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Espacios</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/admin-spaces/create')}
      >
        Crear Nuevo Espacio
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {spaces.length > 0 ? (
            spaces.map((space) => (
              <tr key={space._id}>
                <td>{space.name}</td>
                <td>{space.description}</td>
                <td>{space.capacity}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate(`/admin-spaces/edit/${space._id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(space._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay espacios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSpaces;
