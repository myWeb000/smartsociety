const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js');
const upload = require('../config/multer.js');

router.get('/users', userController.users);
router.post('/adduser', upload.single('image'), userController.adduser);
router.delete('/deleteuser/:id', userController.deleteuser);
router.put('/updateuser/:id', userController.updateuser);

module.exports = router;