const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', controller.getAllUsers);
router.get('/:id',  controller.getUserById);
router.post('/', authMiddleware.verifyToken, controller.createUser);
router.put('/:id', authMiddleware.verifyToken, controller.updateUser);
router.delete('/:id', authMiddleware.verifyToken, controller.deleteUser);

module.exports = router;