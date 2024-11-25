import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import AdminSpaces from '../pages/AdminSpaces';
import CreateSpace from '../pages/CreateSpace';
import EditSpace from '../pages/EditSpace';
import Login from '../components/Login';
import CreateReservation from '../pages/createReservation';
import Navbar from '../components/Navbar';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      {/* Mostrar Navbar solo si no estamos en /login */}
      {location.pathname !== '/login' && <Navbar />}

      {/* Define tus rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-spaces" element={<AdminSpaces />} />
        <Route path="/create-space" element={<CreateSpace />} />
        <Route path="/edit-space/:id" element={<EditSpace />} />
        <Route path="/reserve-space/:id" element={<CreateReservation />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
