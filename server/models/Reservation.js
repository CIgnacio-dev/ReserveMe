const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Formato de fecha, puedes usar Date si prefieres
  time: { type: String, required: true }, // Formato de hora
});

module.exports = mongoose.model('Reservation', reservationSchema);
