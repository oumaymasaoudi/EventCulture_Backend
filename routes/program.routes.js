const express = require('express');
const router = express.Router();

// Importer le middleware auth
const { verifyToken } = require('../middlewares/authMiddleware');

// Importer le controller
const programController = require('../controllers/programController');

// Routes

// 👉 Créer un programme (protégée par verifyToken)
router.post('/', verifyToken, programController.createProgram);

// 👉 Obtenir tous les programmes
router.get('/', programController.getAllPrograms);

// 👉 Obtenir les programmes d'un event spécifique
router.get('/event/:event_id', programController.getProgramsByEvent);

// 👉 Obtenir un programme par ID
router.get('/:id', programController.getProgramById);

// 👉 Modifier un programme (protégée par verifyToken)
router.put('/:id', verifyToken, programController.updateProgram);

// 👉 Supprimer un programme (protégée par verifyToken)
router.delete('/:id', verifyToken, programController.deleteProgram);

// Export du router
module.exports = router;
