const multer = require('multer');
const { storage } = require('../utils/cloudinary'); // Cloudinary storage config import

const upload = multer({ storage }); // Multer instance with Cloudinary storage

module.exports = upload; // Export middleware for use in routes
