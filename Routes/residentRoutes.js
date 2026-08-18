const express = require('express');
const residentController = require('../Controllers/residentController');
const { verifyToken, authorizeRole } = require('../Middleware/authMIddleware');
const upload = require('../config/multer'); // The existing multer config
const router = express.Router();

// Uncomment the following lines when frontend provides token:
// router.use(verifyToken);
// router.use(authorizeRole('Resident'));

router.get('/bills', residentController.getBills);
router.post('/complaints', upload.single('image'), residentController.lodgeComplaint);
router.post('/amenity', residentController.bookAmenity);
router.post('/visitor-pass', residentController.generateVisitorPass);

module.exports = router;
