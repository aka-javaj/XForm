const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/info', userController.getUserInfo);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
