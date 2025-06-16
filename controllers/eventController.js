const db = require('../models');
const Event = db.Event;

// GET all
exports.getAllEvents = async (req, res) => {
  try {
    const items = await Event.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'category',
        'date_start',
        'date_end',
        'price',
        'image_url',
        'lieu_id'
      ],
      include: [
        {
          model: db.Lieu,
          attributes: ['id', 'nom', 'ville'],
          as: 'lieu'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'description',
        'category',
        'date_start',
        'date_end',
        'price',
        'image_url',
        'lieu_id'
      ],
      include: [
        {
          model: db.Lieu,
          attributes: ['id', 'nom', 'ville'],
          as: 'lieu'
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// CREATE
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date_start, date_end, price, image_url, lieu_id } = req.body;


    const user_id = req.user?.id; // ✅ Récupération du user connecté via le middleware d’authentification

    
    if (!user_id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date_start,
      date_end,
      price,
      image_url,
      lieu_id,
      user_id
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Erreur création événement :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'événement" });
  }
};


// UPDATE
exports.updateEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Event not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Event not found' });
    await item.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events?user_id=xxx → mes événements
exports.getEvents = async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.user_id) {
      whereClause.user_id = req.query.user_id;
    }

    const events = await Event.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.json(events);
  } catch (error) {
    console.error('Erreur getEvents:', error);
    res.status(500).json({ message: 'Erreur récupération events' });
  }
};


// GET recent events (not created by user_id)
exports.getRecentEvents = async (req, res) => {
  try {
    const excludeUserId = req.query.exclude_user_id;

    const events = await Event.findAll({
      where: {
        user_id: {
          [require('sequelize').Op.ne]: excludeUserId,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const events = await Event.findAll({
      where: { user_id },
      order: [['date_start', 'ASC']]   // ✅ corriger ici
    });

    res.json(events);
  } catch (error) {
    console.error('Erreur récupération des events par user:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

