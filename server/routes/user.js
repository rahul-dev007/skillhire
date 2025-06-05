const express = require('express');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const upload = require('../middleware/upload');
const User = require('../models/User');

const router = express.Router();

// ✅ Profile route (protected)
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

// ✅ Admin route (protected)
router.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin! You have access to this route.' });
});

// 🆕 ✅ Profile image upload route
router.post('/upload-image', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.image = req.file.path; // Cloudinary URL
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

module.exports = router;
