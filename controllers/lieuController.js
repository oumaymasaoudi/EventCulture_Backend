const { Lieu } = require('../models');

// 👉 Créer un lieu
exports.createLieu = async (req, res) => {
  try {
    const { nom, pays, ville, description, site_web, user_id } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validation de base
    if (!nom || !pays || !ville || !user_id) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const lieu = await Lieu.create({
      nom,
      pays,
      ville,
      image,
      description,
      site_web,
      user_id,
    });

    res.status(201).json(lieu);
  } catch (error) {
    console.error('Erreur création lieu:', error);
    res.status(500).json({ message: "Erreur lors de la création du lieu", error });
  }
};

// 👉 Obtenir tous les lieux
exports.getAllLieux = async (req, res) => {
  try {
    const lieux = await Lieu.findAll();
    res.json(lieux);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des lieux" });
  }
};

// 👉 Obtenir un lieu par ID
exports.getLieuById = async (req, res) => {
  try {
    const lieu = await Lieu.findByPk(req.params.id);
    if (!lieu) return res.status(404).json({ message: "Lieu non trouvé" });
    res.json(lieu);
  } catch (error) {
    console.error("Erreur récupération lieu par ID:", error);
    res.status(500).json({ message: "Erreur lors de la récupération du lieu" });
  }
};

// 👉 Modifier un lieu
exports.updateLieu = async (req, res) => {
  try {
    const id = req.params.id;
    const lieu = await Lieu.findByPk(id);
    if (!lieu) return res.status(404).json({ message: "Lieu non trouvé" });

    const { nom, pays, ville, description, site_web, user_id } = req.body;
    const image = req.file ? req.file.filename : lieu.image; // garder ancienne image si pas modifiée

    await lieu.update({
      nom,
      pays,
      ville,
      description,
      site_web,
      user_id,
      image
    });

    res.json(lieu);
  } catch (error) {
    console.error("Erreur update lieu:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du lieu" });
  }
};

// 👉 Supprimer un lieu
exports.deleteLieu = async (req, res) => {
  try {
    const id = req.params.id;
    const lieu = await Lieu.findByPk(id);
    if (!lieu) return res.status(404).json({ message: "Lieu non trouvé" });

    await lieu.destroy();
    res.json({ message: "Lieu supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression lieu:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du lieu" });
  }
};
