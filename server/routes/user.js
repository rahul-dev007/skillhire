const express = require('express');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Only logged-in users
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

// Only admin
router.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin! You have access to this route.' });
});

module.exports = router;
