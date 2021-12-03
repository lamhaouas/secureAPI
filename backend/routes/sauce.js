const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const verifyToken = require('../verifyToken');
const multer = require('../multer-config')

router.post('/', verifyToken, multer, sauceCtrl.submitSauce);
router.get('/', verifyToken, sauceCtrl.getAllSauces);
router.delete('/:id', verifyToken, sauceCtrl.deleteSauce);
router.get('/:id', verifyToken, sauceCtrl.getOneSauce);
router.put('/:id', verifyToken, sauceCtrl.updateSauce);

module.exports = router;