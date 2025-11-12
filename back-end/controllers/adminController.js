const Candidato = require('../models/candidato');

const painelAdmin = async (req, res) => {
  try {
    const data = await Candidato.findAll({ raw: true });
    res.render('admin', { data });
  } catch (err) {
    console.error('Erro ao carregar painel admin:', err);
    res.status(500).send('Erro ao carregar painel admin.');
  }
};

module.exports = { painelAdmin };
