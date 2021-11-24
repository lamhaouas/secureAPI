const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const verifyToken = require('../verifyToken');
const multer = require('../multer-config');



module.exports = router;