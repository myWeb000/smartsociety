const express = require('express');
const adminController = require('../Controllers/adminController');
const { verifyToken, authorizeRole } = require('../Middleware/authMIddleware');
const router = express.Router();

// Unprotected route for testing
router.get('/flats', adminController.getAllFlats);

// Enable protected routes for the rest
router.use(verifyToken);
router.use(authorizeRole('Admin'));

router.post('/flats', adminController.createFlat);
router.put('/flats/:id/assign', adminController.assignResident);

router.post('/bills', adminController.generateBill);
router.get('/bills', adminController.getAllBills);

router.get('/complaints', adminController.getAllComplaints);
router.put('/complaints/:id', adminController.updateComplaintStatus);

router.get('/dashboard', adminController.getDashboardStats);

module.exports = router;
