import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); // Exporta el contexto

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
  
      // Decodifica el token para obtener el rol
      const decoded = JSON.parse(atob(storedToken.split('.')[1]));
      setRole(decoded.role);
      console.log(decoded);
    } else {
      setIsAuthenticated(false); // Asegúrate de limpiar el estado si no hay token
      setToken(null);
      setRole(null);
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setToken(token);
    setRole(role);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, role }}>
      {children}
    </AuthContext.Provider>
  );
};
