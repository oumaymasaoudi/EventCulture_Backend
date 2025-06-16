const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

// ici tu peux ajouter verifyToken comme pour Program

const { verifyToken } = require('../middlewares/authMiddleware');

// ici on protège les routes POST, PUT, DELETE
router.post('/', verifyToken, siteController.createSite);
router.put('/:id', verifyToken, siteController.updateSite);
router.delete('/:id', verifyToken, siteController.deleteSite);

// GET all et GET by id → pas protégé, sauf si tu veux le faire :
router.get('/', siteController.getAllSites);
router.get('/:id', siteController.getSiteById);

module.exports = router;
