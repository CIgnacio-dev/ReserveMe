import jwtDecode from 'jwt-decode';

// Verificar si el token es válido (no expirado)
export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Verificar si no ha expirado
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return false;
  }
};

// Decodificar el token para obtener información del usuario
export const getUserInfoFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

// Guardar el token en el almacenamiento local
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Eliminar el token del almacenamiento local
export const clearToken = () => {
  localStorage.removeItem('token');
};

// Obtener el token del almacenamiento local
export const getToken = () => {
  return localStorage.getItem('token');
};
