import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getSpaceById, updateSpace } from '../utils/api';

const EditSpace = () => {
  const [space, setSpace] = useState({ name: '', description: '', capacity: '' });
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await getSpaceById(token, id);
        setSpace(data);
      } catch (error) {
      
      }
    };

    fetchSpace();
  }, [token, id]);

  const handleChange = (e) => {
    setSpace({ ...space, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSpace(token, id, space);
      alert('Espacio actualizado exitosamente.');
      navigate('/');
    } catch (error) {
      alert('Error al actualizar el espacio.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Espacio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={space.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={space.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capacidad</label>
          <input
            type="number"
            className="form-control"
            name="capacity"
            value={space.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate('/')}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditSpace;
