const { Favori, Program, Event, Site, User } = require('../models');

// Ajouter un favori
exports.addFavori = async (req, res) => {
  try {
    const { userId, programId, eventId, siteId } = req.body;

    // Vérifie si le favori existe déjà pour site ou programme
    const existing = await Favori.findOne({
      where: {
        userId,
        ...(programId && { programId }),
        ...(siteId && { siteId })
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Ce contenu est déjà en favori.' });
    }

    const newFavori = await Favori.create({ userId, programId, eventId, siteId });
    res.status(201).json(newFavori);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du favori :', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout.' });
  }
};

// 🔹 Obtenir les favoris d’un utilisateur
exports.getFavorisByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const favoris = await Favori.findAll({
  where: { userId },
  include: [
    {
      model: Program,
      as: 'Program',
      include: [
        { model: Event, as: 'event' }
      ]
    },
    {
      model: Site,
      as: 'FavoriSite' // ✅ utiliser le même alias que dans index.js
    }
  ]
});


    res.status(200).json(favoris);
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération.' });
  }
};

// 🔹 Supprimer un favori
exports.removeFavori = async (req, res) => {
  try {
    const { userId, programId, siteId } = req.body;

    const deleted = await Favori.destroy({
      where: {
        userId,
        ...(programId && { programId }),
        ...(siteId && { siteId })
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Favori non trouvé.' });
    }

    res.status(200).json({ message: 'Favori supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du favori :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression.' });
  }
};
