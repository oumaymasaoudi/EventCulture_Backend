const express = require('express');
const router = express.Router();
const controller = require('../controllers/participationController');

router.get('/participants', controller.getParticipants); // ajouter cette ligne
router.get('/', controller.getAllParticipations);
router.get('/:id', controller.getParticipationById);
router.post('/', controller.createParticipation);
router.put('/:id', controller.updateParticipation);
router.delete('/:id', controller.deleteParticipation);

module.exports = router;
