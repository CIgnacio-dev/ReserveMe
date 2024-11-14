import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

export const getSpaces = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/spaces`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los espacios:', error);
    throw new Error('No se pudieron obtener los espacios. Intenta nuevamente.');
  }
};

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;

    // Guardar el token en localStorage
    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Credenciales incorrectas');
  }
};
