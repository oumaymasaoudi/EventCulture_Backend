const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅

router.get('/recent', eventController.getRecentEvents); // ✅

router.post('/', verifyToken, eventController.createEvent); // ✅


// Events par id user (👉 la route qui te manque !!)
router.get('/user/:user_id', verifyToken, eventController.getEventsByUser);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
