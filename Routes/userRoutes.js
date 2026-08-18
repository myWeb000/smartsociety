const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js');
const upload = require('../config/multer.js');

const { verifyToken, authorizeRole } = require('../Middleware/authMIddleware');

// Protect these routes (requires login, mostly used by Admin)
router.use(verifyToken);
router.use(authorizeRole('Admin'));

router.get('/users', userController.users);
router.post('/adduser', upload.single('image'), userController.adduser);
router.delete('/deleteuser/:id', userController.deleteuser);
router.put('/updateuser/:id', userController.updateuser);

module.exports = router;