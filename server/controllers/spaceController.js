const Space = require('../models/Space');

// Obtener todos los espacios
const getSpaces = async (req, res) => {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los espacios' });
  }
};

// Obtener un espacio por ID
const getSpaceById = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    res.status(200).json(space);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el espacio' });
  }
};

// Crear un nuevo espacio
const createSpace = async (req, res) => {
  try {
    const { name, description, capacity } = req.body;
    const newSpace = new Space({ name, description, capacity });
    await newSpace.save();
    res.status(201).json({ message: 'Espacio creado exitosamente', space: newSpace });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el espacio' });
  }
};

// Actualizar un espacio
const updateSpace = async (req, res) => {
  try {
    const { name, description, capacity } = req.body;
    const updatedSpace = await Space.findByIdAndUpdate(
      req.params.id,
      { name, description, capacity },
      { new: true }
    );
    if (!updatedSpace) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    res.status(200).json({ message: 'Espacio actualizado exitosamente', space: updatedSpace });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el espacio' });
  }
};

// Eliminar un espacio
const deleteSpace = async (req, res) => {
  try {
    const deletedSpace = await Space.findByIdAndDelete(req.params.id);
    if (!deletedSpace) {
      return res.status(404).json({ message: 'Espacio no encontrado' });
    }
    res.status(200).json({ message: 'Espacio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el espacio' });
  }
};

module.exports = {
  getSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace,
};
