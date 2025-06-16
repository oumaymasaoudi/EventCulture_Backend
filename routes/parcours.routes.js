const express = require('express');
const router = express.Router();
const parcoursController = require('../controllers/parcoursController');


const multer = require('multer');
const path = require('path');

// Config storage Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où stocker les images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
  }
});

const upload = multer({ storage: storage });
// GET ALL
router.get('/', parcoursController.getAllParcours);

const processImage = require('../middlewares/imageProcessor');

router.post('/create', upload.single('image'), processImage, parcoursController.createParcours);


// GET BY ID
router.get('/:id', parcoursController.getParcoursById);

// UPDATE
router.put('/:id', parcoursController.updateParcours);

// DELETE
router.delete('/:id', parcoursController.deleteParcours);

module.exports = router;
