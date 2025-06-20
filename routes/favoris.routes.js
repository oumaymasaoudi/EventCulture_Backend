const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favorisController');

router.post('/', favorisController.addFavori);
router.get('/user/:userId', favorisController.getFavorisByUser);
router.delete('/remove', favorisController.removeFavori);

module.exports = router;
