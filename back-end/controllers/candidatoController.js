const bcrypt = require('bcryptjs');
const Candidato = require('../models/candidato');
require('dotenv').config();

const addCandidato = async (req, res) => {
  const { nome, email, empresa, whyUs, senha, login } = req.body;
  const aprovacao = 'analise';

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    await Candidato.create({ nome, email, empresa, whyUs, senha: senhaHash, login, aprovacao });
    res.redirect('/');
  } catch (err) {
    console.error('Erro ao cadastrar candidato:', err);
    res.status(500).send('Erro ao cadastrar candidato.');
  }
};

const login = (req, res) => {
  const { email, senha } = req.body;

  if (email === process.env.ADMIN_EMAIL && senha === process.env.ADMIN_PASSWORD) {
    return res.redirect('/admin');
  }

  res.send('Login de candidato não implementado na versão simplificada.');
};

const aprovar = async (req, res) => {
  await Candidato.update({ aprovacao: 'aprovado' }, { where: { id: req.params.id } });
  res.redirect('/admin');
};

const reprovar = async (req, res) => {
  await Candidato.update({ aprovacao: 'reprovado' }, { where: { id: req.params.id } });
  res.redirect('/admin');
};

module.exports = { addCandidato, login, aprovar, reprovar };
