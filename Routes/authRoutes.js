const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/api/auth/register', authController.Register);
router.post('/api/auth/login', authController.Login);

module.exports = router;
