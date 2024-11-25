const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
});

module.exports = mongoose.model('Space', spaceSchema);
