const Reservation = require('../models/Reservation');

// Obtener todas las reservas
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('space') // Rellena los datos del espacio
      .populate('user'); // Rellena los datos del usuario
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};

// Crear una nueva reserva
const createReservation = async (req, res) => {
  try {
    const { space, user, date, time } = req.body;

    const newReservation = new Reservation({
      space,
      user,
      date,
      time,
    });

    await newReservation.save();
    res.status(201).json({ message: 'Reserva creada exitosamente', reservation: newReservation });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
};

module.exports = {
  getReservations,
  createReservation,
};
