const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middlewares/authMiddleware'); // 





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


const processImage = require('../middlewares/imageProcessor');



router.get('/recent', eventController.getRecentEvents); // 

router.post(
  '/',
  verifyToken,
  upload.single('image'),      // 👈 gère le fichier venant du front
  processImage,                // 👈 redimensionne et traite l’image
  eventController.createEvent
);


// Events par id user (👉 la route qui te manque !!)
router.get('/user/:user_id', verifyToken, eventController.getEventsByUser);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put(
  '/:id',
  verifyToken,
  upload.single('image'),
  processImage,
  eventController.updateEvent
);

router.delete('/:id', eventController.deleteEvent);

module.exports = router;
