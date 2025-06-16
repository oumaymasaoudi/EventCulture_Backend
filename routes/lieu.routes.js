const express = require('express');
const router = express.Router();
const lieuController = require('../controllers/lieuController');

// 👉 Créer un lieu
router.post('/', lieuController.createLieu);

// 👉 Obtenir tous les lieux
router.get('/', lieuController.getAllLieux);

// 👉 Obtenir un lieu par ID
router.get('/:id', lieuController.getLieuById);

// 👉 Modifier un lieu
router.put('/:id', lieuController.updateLieu);

// 👉 Supprimer un lieu
router.delete('/:id', lieuController.deleteLieu);

module.exports = router;
