// routes/spaceRoutes.js
const express = require('express');
const router = express.Router();
const Space = require('../models/Space');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un nuevo espacio (protegido)
router.post('/spaces', authMiddleware, async (req, res) => {
  try {
    const newSpace = new Space(req.body);
    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los espacios (protegido)
router.get('/spaces', authMiddleware, async (req, res) => {
  try {
    const spaces = await Space.find();
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un espacio (protegido)
router.put('/spaces/:id', authMiddleware, async (req, res) => {
  try {
    const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpace) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    res.json(updatedSpace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un espacio (protegido)
router.delete('/spaces/:id', authMiddleware, async (req, res) => {
  try {
    const deletedSpace = await Space.findByIdAndDelete(req.params.id);
    if (!deletedSpace) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    res.json({ message: 'Espacio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
