const express = require('express');
const { getReservations, createReservation } = require('../controllers/reservationController');
const router = express.Router();

router.get('/reservations', getReservations); // Ruta para obtener reservas
router.post('/reservations', createReservation); // Ruta para crear una nueva reserva

module.exports = router;
