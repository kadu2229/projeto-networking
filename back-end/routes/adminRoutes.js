const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Painel admin
router.get('/admin', adminController.painelAdmin);

module.exports = router;
