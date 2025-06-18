const express = require('express');
const router = express.Router();
const lieuController = require('../controllers/lieuController');
const { verifyToken } = require('../middlewares/authMiddleware');

const multer = require('multer');
const path = require('path');
const processImage = require('../middlewares/imageProcessor');

// 📦 Config storage pour les fichiers images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier de destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
  }
});

const upload = multer({ storage });

// ✅ Créer un lieu
router.post(
  '/',
  verifyToken,
  upload.single('image'), // 👈 réception image
  processImage,           // 👈 traitement avec sharp
  lieuController.createLieu
);

// ✅ Modifier un lieu
router.put(
  '/:id',
  verifyToken,
  upload.single('image'),
  processImage,
  lieuController.updateLieu
);

// ✅ Obtenir tous les lieux
router.get('/', lieuController.getAllLieux);

// ✅ Obtenir un lieu par ID
router.get('/:id', lieuController.getLieuById);

// ✅ Supprimer un lieu
router.delete('/:id', verifyToken, lieuController.deleteLieu);

module.exports = router;
