const Aviso = require('../models/aviso');

const listarAvisos = async (req, res) => {
  try {
    const avisos = await Aviso.findAll({ order: [['createdAt', 'DESC']] });
    res.render('avisos', { avisos: avisos.map(a => a.get({ plain: true })) });
  } catch (err) {
    console.error('Erro ao buscar avisos:', err);
    res.status(500).send('Erro ao carregar avisos.');
  }
};

const criarAviso = async (req, res) => {
  const { titulo, mensagem } = req.body;
  try {
    await Aviso.create({ titulo, mensagem, autorid: 1 }); // admin fixo
    res.redirect('/avisos');
  } catch (err) {
    console.error('Erro ao criar aviso:', err);
    res.status(500).send('Erro ao criar aviso.');
  }
};

module.exports = { listarAvisos, criarAviso };