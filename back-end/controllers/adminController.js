const Candidato = require('../models/candidato');

const painelAdmin = async (req, res) => {
  try {
    const data = await Candidato.findAll({ raw: true });
    res.json(data); // 👈 retorna JSON em vez de renderizar view
  } catch (err) {
    console.error('Erro ao carregar painel admin:', err);
    res.status(500).json({ error: 'Erro ao carregar painel admin.' });
  }
};

module.exports = { painelAdmin };
