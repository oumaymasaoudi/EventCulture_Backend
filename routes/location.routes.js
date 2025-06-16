const express = require('express');
const router = express.Router();
const controller = require('../controllers/locationController');
const { verifyToken } = require('../middlewares/authMiddleware');


router.get('/', controller.getAllLocations);
router.get('/:id', controller.getLocationById);
router.post('/', controller.createLocation);
router.put('/:id', controller.updateLocation);
router.delete('/:id', controller.deleteLocation);
router.post('/', verifyToken, controller.createLocation);


module.exports = router;