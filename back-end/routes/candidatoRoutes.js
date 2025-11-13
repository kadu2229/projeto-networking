const express = require('express');
const router = express.Router();
const candidatoController = require('../controllers/candidatoController');

// Adicionar candidato
router.post('/addcandidato', candidatoController.addCandidato);

// Login
router.post('/login', candidatoController.login);

// Aprovar / Reprovar candidato (admin)
router.patch('/aprovar/:id', candidatoController.aprovar);
router.patch('/reprovar/:id', candidatoController.reprovar);

module.exports = router;
