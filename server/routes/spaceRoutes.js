const express = require('express');
const { getSpaces, getSpaceById, createSpace, updateSpace, deleteSpace } = require('../controllers/spaceController');
const authMiddleware = require('../middlewares/authMiddleware'); // Asegúrate de que este archivo existe
const router = express.Router();

// Obtener todos los espacios (protegido)
router.get('/spaces', authMiddleware, getSpaces);

// Obtener un espacio por ID (protegido)
router.get('/spaces/:id', authMiddleware, getSpaceById);

// Crear un nuevo espacio (protegido)
router.post('/spaces', authMiddleware, createSpace);

// Actualizar un espacio (protegido)
router.put('/spaces/:id', authMiddleware, updateSpace);

// Eliminar un espacio (protegido)
router.delete('/spaces/:id', authMiddleware, deleteSpace);

module.exports = router;
