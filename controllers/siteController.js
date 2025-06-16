const { Site } = require('../models');

// CREATE Site
exports.createSite = async (req, res) => {
  try {
    const site = await Site.create({
      name: req.body.name,
      categorie: req.body.categorie,
      description: req.body.description,
      adresse: req.body.adresse,
      heure_ouverture: req.body.heure_ouverture,
      tarif: req.body.tarif,
      telephone: req.body.telephone,
      email: req.body.email,
      site_web: req.body.site_web,
      services: req.body.services, // déjà stringify côté front
      image: req.body.image,
      transport: req.body.transport,
      periode_historique: req.body.periode_historique,
      style_architectural: req.body.style_architectural,
      points_interet: req.body.points_interet,
      lieu_id: req.body.lieu_id,
      parcours_id: req.body.parcours_id, // clé pour que le front voie les Sites du parcours
      user_id: req.body.user_id,
    });

    res.status(201).json(site);
  } catch (error) {
    console.error("Erreur création site:", error);
    res.status(500).json({ message: "Erreur lors de la création du site" });
  }
};

// GET ALL Sites
exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.findAll();
    res.json(sites);
  } catch (error) {
    console.error("Erreur récupération sites:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des sites" });
  }
};

// GET Site by ID
exports.getSiteById = async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);

    if (!site) {
      return res.status(404).json({ message: "Site non trouvé" });
    }

    res.json(site);
  } catch (error) {
    console.error("Erreur récupération site par ID:", error);
    res.status(500).json({ message: "Erreur lors de la récupération du site" });
  }
};

// UPDATE Site
exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);

    if (!site) {
      return res.status(404).json({ message: "Site non trouvé" });
    }

    await site.update({
      name: req.body.name,
      categorie: req.body.categorie,
      description: req.body.description,
      adresse: req.body.adresse,
      heure_ouverture: req.body.heure_ouverture,
      tarif: req.body.tarif,
      telephone: req.body.telephone,
      email: req.body.email,
      site_web: req.body.site_web,
      services: req.body.services,
      image: req.body.image,
      transport: req.body.transport,
      periode_historique: req.body.periode_historique,
      style_architectural: req.body.style_architectural,
      points_interet: req.body.points_interet,
      lieu_id: req.body.lieu_id,
      parcours_id: req.body.parcours_id,
      user_id: req.body.user_id,
    });

    res.json(site);
  } catch (error) {
    console.error("Erreur update site:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du site" });
  }
};

// DELETE Site
exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);

    if (!site) {
      return res.status(404).json({ message: "Site non trouvé" });
    }

    await site.destroy();

    res.json({ message: "Site supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression site:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du site" });
  }
};
