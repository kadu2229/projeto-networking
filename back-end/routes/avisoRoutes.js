const express = require('express');
const router = express.Router();
const avisoController = require('../controllers/avisoController');

// Listar avisos
router.get('/avisos', avisoController.listarAvisos);

// Criar aviso (acesso admin, mas sem autenticação por enquanto)
router.post('/admin/avisos', avisoController.criarAviso);

module.exports = router;
