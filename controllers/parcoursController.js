const { Parcours, Lieu } = require('../models');
const path = require('path');

// CREATE PARCOURS AVEC IMAGE
exports.createParcours = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const { title, description, theme, difficulty, duration, user_id, lieu_id } = req.body;

   const parcours = await Parcours.create({
  title,
  description,
  theme,
  difficulty,
  duration,
  user_id,
  lieu_id,
  image: req.file ? req.file.filename : null, // ✅ utiliser filename (PAS path)
});


    res.status(201).json(parcours);
  } catch (error) {
    console.error("Erreur création parcours:", error);
    res.status(500).json({ message: "Erreur lors de la création du parcours" });
  }
};

   

// GET ALL PARCOURS
exports.getAllParcours = async (req, res) => {
  try {
    const parcours = await Parcours.findAll({
      include: [
        {
          model: Lieu,
          attributes: ['id', 'nom', 'ville', 'pays']
        }
      ]
    });
    res.status(200).json(parcours);
  } catch (error) {
    console.error("Erreur récupération parcours:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des parcours" });
  }
};

// GET PARCOURS BY ID
exports.getParcoursById = async (req, res) => {
  try {
    const parcours = await Parcours.findByPk(req.params.id, {
      include: [
        {
          model: Lieu,
          attributes: ['id', 'nom', 'ville', 'pays']
        }
      ]
    });

    if (!parcours) {
      return res.status(404).json({ message: 'Parcours non trouvé' });
    }

    // Construction d'un objet clair pour le front
    res.status(200).json({
      id: parcours.id,
      title: parcours.title,
      description: parcours.description,
      theme: parcours.theme,
      difficulty: parcours.difficulty,
      duration: parcours.duration,
      image: parcours.image ? parcours.image : null,  // ✅ toujours renvoyer le champ image
      Lieu: parcours.Lieu ? {
        id: parcours.Lieu.id,
        nom: parcours.Lieu.nom,
        ville: parcours.Lieu.ville,
        pays: parcours.Lieu.pays
      } : null
    });
  } catch (error) {
    console.error("Erreur récupération parcours par ID:", error);
    res.status(500).json({ message: "Erreur lors de la récupération du parcours" });
  }
};

// UPDATE PARCOURS
exports.updateParcours = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, theme, difficulty, duration, lieu_id } = req.body;

    const parcours = await Parcours.findByPk(id);
    if (!parcours) {
      return res.status(404).json({ message: 'Parcours non trouvé' });
    }

    // Gestion image (si on veut modifier l'image)
    let imagePath = parcours.image; // par défaut ancienne image
    if (req.file) {
      imagePath = req.file.filename;
    }

    await parcours.update({
      title,
      description,
      theme,
      difficulty,
      image: imagePath,
      duration,
      lieu_id
    });

    res.status(200).json(parcours);
  } catch (error) {
    console.error("Erreur update parcours:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du parcours" });
  }
};

// DELETE PARCOURS
exports.deleteParcours = async (req, res) => {
  try {
    const parcours = await Parcours.findByPk(req.params.id);
    if (!parcours) {
      return res.status(404).json({ message: 'Parcours non trouvé' });
    }

    await parcours.destroy();
    res.status(200).json({ message: 'Parcours supprimé avec succès' });
  } catch (error) {
    console.error("Erreur suppression parcours:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du parcours" });
  }
};
