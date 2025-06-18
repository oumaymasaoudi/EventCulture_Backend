const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const multer = require('multer'); 
const path = require('path');

// Config storage Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });
// GET ALL


const processImage = require('../middlewares/imageProcessor');

const { verifyToken } = require('../middlewares/authMiddleware');

// ici on protège les routes POST, PUT, DELETE
router.post('/', verifyToken, upload.single('image'), siteController.createSite);
router.put('/:id', verifyToken, siteController.updateSite);
router.delete('/:id', verifyToken, siteController.deleteSite);

// GET all et GET by id → pas protégé, sauf si tu veux le faire :
router.get('/', siteController.getAllSites);
router.get('/:id', siteController.getSiteById);

router.get('/by-parcours/:id', siteController.getSitesByParcoursId);


module.exports = router;
