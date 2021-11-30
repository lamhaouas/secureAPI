const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const verifyToken = require('../verifyToken');
const multer = require('../multer-config')

router.post('/', verifyToken, multer, sauceCtrl.submitSauce);

module.exports = router;