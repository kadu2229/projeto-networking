const express = require('express');
const router = express.Router();
const reuniaoController = require('../controllers/reuniaoController');

// Listar reuniões
router.get('/reunioes', reuniaoController.listarReunioes);

// Criar reunião (acesso admin, sem autenticação por enquanto)
router.post('/admin/reunioes/nova', reuniaoController.criarReuniao);

// Registrar presença (membro)
router.post('/reunioes/:id/checkin', reuniaoController.registrarPresenca);

module.exports = router;
