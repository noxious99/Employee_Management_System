const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Use path.join for better cross-platform compatibility
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create and export multer instance
const upload = multer({ storage : storage });

module.exports = { upload };
