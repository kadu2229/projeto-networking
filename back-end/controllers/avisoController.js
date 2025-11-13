const Aviso = require('../models/aviso');

// GET /avisos
const listarAvisos = async (req, res) => {
  try {
    const avisos = await Aviso.findAll({ order: [['createdAt', 'DESC']] });
    res.json(avisos); // 👈 retorna JSON
  } catch (err) {
    console.error('Erro ao buscar avisos:', err);
    res.status(500).json({ error: 'Erro ao carregar avisos.' });
  }
};

// POST /avisos
const criarAviso = async (req, res) => {
  const { titulo, mensagem } = req.body;

  try {
    const novoAviso = await Aviso.create({
      titulo,
      mensagem,
      autorid: 1 // admin fixo
    });

    res.status(201).json(novoAviso); // 👈 retorna o aviso criado
  } catch (err) {
    console.error('Erro ao criar aviso:', err);
    res.status(500).json({ error: 'Erro ao criar aviso.' });
  }
};

module.exports = { listarAvisos, criarAviso };
