const { Site } = require('../models');
 // si tu n’as pas encore ajouté node-fetch
async function getCoordinatesFromAdresse(adresse) {
  const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(adresse)}&lang=fr`);
  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Adresse introuvable pour la géolocalisation.");
  }

  const [longitude, latitude] = data.features[0].geometry.coordinates;
  return { latitude, longitude };
}



// CREATE Site
exports.createSite = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // 🔁 Appel API de géocodage Photon
    const { latitude, longitude } = await getCoordinatesFromAdresse(req.body.adresse);

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
      services: req.body.services,
      image: imagePath,
      transport: req.body.transport,
      periode_historique: req.body.periode_historique,
      style_architectural: req.body.style_architectural,
      points_interet: req.body.points_interet,
      lieu_id: req.body.lieu_id,
      parcours_id: req.body.parcours_id,
      user_id: req.body.user_id,

      // ✅ Latitude / Longitude récupérées automatiquement
      latitude,
      longitude
    });

    res.status(201).json(site);
  } catch (error) {
    console.error("Erreur création site:", error);
    res.status(500).json({ message: "Erreur lors de la création du site" });
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
      image: req.body.image, // ✅ pas besoin de req.file ni parcours.image
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

// GET Sites by parcours_id
exports.getSitesByParcoursId = async (req, res) => {
  try {
    const parcoursId = req.params.id;
    const sites = await Site.findAll({
      where: { parcours_id: parcoursId }
    });

    res.json(sites);
  } catch (error) {
    console.error("Erreur récupération sites du parcours :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des sites du parcours" });
  }
};
