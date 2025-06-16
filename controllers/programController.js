const { Program } = require('../models');

// 👉 Créer un programme
const createProgram = async (req, res) => {
  try {
    const user_id = req.user?.id; // facultatif
    const { event_id, date, start_time, end_time, title, description, category, site_id } = req.body;

    if (!event_id || !date || !start_time || !end_time || !title) {
      return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    const newProgram = await Program.create({
      event_id,
      user_id,
      site_id, // on le met aussi (même si c'est optionnel)
      date,
      start_time,
      end_time,
      title,
      description,
      category
    });

    res.status(201).json({ message: 'Programme ajouté avec succès', program: newProgram });
  } catch (error) {
    console.error('Erreur ajout programme :', error);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout du programme" });
  }
};

// 👉 Obtenir tous les programmes
const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      order: [['date', 'ASC'], ['start_time', 'ASC']]
    });
    res.json(programs);
  } catch (error) {
    console.error('Erreur récupération programs:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// 👉 Obtenir les programmes par event_id
const getProgramsByEvent = async (req, res) => {
  try {
    const event_id = req.params.event_id;

    const programs = await Program.findAll({
      where: { event_id },
      order: [['date', 'ASC'], ['start_time', 'ASC']]
    });

    res.json(programs);
  } catch (error) {
    console.error('Erreur récupération des programmes :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// 👉 Obtenir un programme par ID
const getProgramById = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    res.json(program);
  } catch (error) {
    console.error('Erreur récupération programme par ID :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// 👉 Modifier un programme
const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    await program.update(req.body);

    res.json({ message: 'Programme mis à jour avec succès', program });
  } catch (error) {
    console.error('Erreur update programme:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// 👉 Supprimer un programme
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    await program.destroy();

    res.json({ message: 'Programme supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression programme:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// 👉 Export des fonctions
module.exports = {
  createProgram,
  getAllPrograms,
  getProgramsByEvent,
  getProgramById,
  updateProgram,
  deleteProgram
};
