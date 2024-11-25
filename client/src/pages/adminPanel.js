import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulación de llamada a API
    const fetchData = async () => {
      const response = await fetch('/api/admin-data');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Panel de Administración</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
