const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const upload = require('../middleware/upload');

const router = express.Router();

// 🟢 Register route with optional image upload
router.post('/register', upload.single('image'), registerUser);

// 🟢 Login route
router.post('/login', loginUser);

module.exports = router;
