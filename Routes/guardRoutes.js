const express = require('express');
const guardController = require('../Controllers/guardController');
const { verifyToken, authorizeRole } = require('../Middleware/authMIddleware');
const router = express.Router();

// Un-commented to enable protected routes
router.use(verifyToken);
router.use(authorizeRole('Guard'));

router.post('/verify-pass', guardController.verifyPass);
router.post('/walk-in', guardController.walkInEntry);
router.post('/exit/:id', guardController.markExit);
router.get('/visitors', guardController.getActiveVisitors); // To see who is inside right now

module.exports = router;

