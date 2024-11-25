import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
};

export const getSpaces = async (token) => {
  const response = await axios.get(`${BASE_URL}/spaces`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getSpaceById = async (token, id) => {
  const response = await fetch(`${BASE_URL}/spaces/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener el espacio');
  }
  return response.json();
};



export const createSpace = async (spaceData, token) => {
  const response = await axios.post(`${BASE_URL}/spaces`, spaceData, {
    headers: {
      Authorization: `Bearer ${token}`, // Asegúrate de que se envía el token aquí
    },
  });
  return response.data;
};

export const updateSpace = async (token, id, updatedSpace) => {
  const response = await axios.put(`${BASE_URL}/spaces/${id}`, updatedSpace, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteSpace = async (token, id) => {
  const response = await axios.delete(`${BASE_URL}/spaces/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
