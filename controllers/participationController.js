const Participation = require('../models').Participation;

// GET all
exports.getAllParticipations = async (req, res) => {
  try {
    const items = await Participation.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
exports.getParticipationById = async (req, res) => {
  try {
    const item = await Participation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Participation not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createParticipation = async (req, res) => {
  try {
    const newItem = await Participation.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
exports.updateParticipation = async (req, res) => {
  try {
    const item = await Participation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Participation not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteParticipation = async (req, res) => {
  try {
    const item = await Participation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Participation not found' });
    await item.destroy();
    res.json({ message: 'Participation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/participants?user_id=xxx → mes participations
exports.getParticipants = async (req, res) => {
  try {
    const userId = req.query.user_id;

    if (!userId) {
      return res.status(400).json({ message: 'user_id requis' });
    }

    const participants = await Participation.findAll({
      where: { user_id: userId },
      include: [
        { model: require('../models').Event, attributes: ['title', 'date_start', 'date_end'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(participants);
  } catch (error) {
    console.error('Erreur getParticipants:', error);
    res.status(500).json({ message: 'Erreur récupération participations' });
  }
};
