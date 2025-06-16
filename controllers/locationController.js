const Location = require('../models').Location;

// GET all
exports.getAllLocations = async (req, res) => {
  try {
    const items = await Location.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
exports.getLocationById = async (req, res) => {
  try {
    const item = await Location.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Location not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createLocation = async (req, res) => {
  const { name, address, city, country } = req.body;

  if (!name || !address || !city || !country) {
    return res.status(400).json({ error: 'Les champs nom, adresse, ville et pays sont obligatoires' });
  }

  try {
    const newItem = await Location.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// UPDATE
exports.updateLocation = async (req, res) => {
  try {
    const item = await Location.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Location not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteLocation = async (req, res) => {
  try {
    const item = await Location.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Location not found' });
    await item.destroy();
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};