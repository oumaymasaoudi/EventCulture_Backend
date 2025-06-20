const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController');
const multer = require('multer');
const path = require('path');

// stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// routes
router.post('/', upload.array('oeuvres_images'), participationController.createParticipationWithUpload);
router.get('/', participationController.getAllParticipations);

router.put('/:id', participationController.updateParticipation);

module.exports = router;
