const fs = require('fs');
const path = require('path');
const { Participation, Event } = require('../models');
const multer = require('multer');

// Configuration de multer (destination et nommage des fichiers)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/oeuvres';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });
exports.uploadImages = upload.array('oeuvres_images');

// ✅ GET toutes les participations (avec montant_paye bien inclus)
exports.getAllParticipations = async (req, res) => {
  try {
    const where = {};
    if (req.query.user_id) where.user_id = req.query.user_id;

    const items = await Participation.findAll({
      where,
      attributes: [
        'id', 'event_id', 'user_id', 'statut', 'date_inscription',
        'createdAt', 'updatedAt', 'montant_paye', 'payment_status', 'motivation'
      ]
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getParticipationById = async (req, res) => {
  try {
    const item = await Participation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Participation introuvable' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createParticipationWithUpload = async (req, res) => {
  try {
    const {
      nom, prenom, email, telephone, motivation, demandes_speciales,
      nombre_places, montant_paye, user_id, event_id, statut, date_inscription
    } = req.body;

    const oeuvres_images = req.files ? req.files.map(file => file.filename) : [];

    const participation = await Participation.create({
      nom,
      prenom,
      email,
      telephone,
      motivation,
      demandes_speciales,
      nombre_places,
      montant_paye,
      user_id,
      event_id,
      statut,
      date_inscription,
      oeuvres_images
    });

    res.status(201).json(participation);
  } catch (error) {
    console.error("Erreur création participation :", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateParticipation = async (req, res) => {
  try {
    const item = await Participation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Participation introuvable' });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteParticipation = async (req, res) => {
  try {
    const item = await Participation.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Participation introuvable' });

    await item.destroy();
    res.json({ message: 'Participation supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ message: 'user_id requis' });

    const participants = await Participation.findAll({
      where: { user_id: userId },
      include: [
        { model: Event, attributes: ['title', 'date_start', 'date_end'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(participants);
  } catch (error) {
    console.error('Erreur getParticipants:', error);
    res.status(500).json({ message: 'Erreur récupération participations' });
  }
};
