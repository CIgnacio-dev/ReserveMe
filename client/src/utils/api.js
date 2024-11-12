import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getSpaces = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/spaces`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los espacios:', error);
    throw new Error('Error al obtener los espacios');
  }
};
