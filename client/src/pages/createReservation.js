import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getSpaceById } from '../utils/api';
import axios from 'axios';

const CreateReservation = () => {
  const { id } = useParams(); // Captura el ID del espacio desde la URL
  const [space, setSpace] = useState(null);
  const [date, setDate] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const data = await getSpaceById(token, id);
        setSpace(data);
      } catch (error) {
        alert('Error al obtener los datos del espacio');
      }
    };
    fetchSpace();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/reservations',
        { space: id, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Reserva creada exitosamente');
    } catch (error) {
      alert('Error al crear la reserva');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Reserva</h2>
      {space && (
        <>
          <p>
            <strong>Espacio: </strong>
            {space.name}
          </p>
          <p>
            <strong>Descripción: </strong>
            {space.description}
          </p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Reservar
        </button>
      </form>
    </div>
  );
};

export default CreateReservation;
