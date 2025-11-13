const bcrypt = require('bcryptjs');
const Candidato = require('../models/candidato');
require('dotenv').config();

// POST /candidatos
const addCandidato = async (req, res) => {
  const { nome, email, empresa, whyUs, senha, login } = req.body;
  const aprovacao = 'analise';

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoCandidato = await Candidato.create({
      nome,
      email,
      empresa,
      whyUs,
      senha: senhaHash,
      login,
      aprovacao
    });

    res.status(201).json(novoCandidato); // 👈 retorna o candidato criado
  } catch (err) {
    console.error('Erro ao cadastrar candidato:', err);
    res.status(500).json({ error: 'Erro ao cadastrar candidato.' });
  }
};

// POST /login
const login = async (req, res) => {
  const { email, senha } = req.body;

  // Login de admin (fixo via .env)
  if (email === process.env.ADMIN_EMAIL && senha === process.env.ADMIN_PASSWORD) {
    return res.json({ role: 'admin', redirect: '/admin' }); // 👈 agora responde com JSON
  }

  // Login de candidato
  try {
    const candidato = await Candidato.findOne({ where: { email } });
    if (!candidato) return res.status(404).json({ error: 'Candidato não encontrado.' });

    const senhaCorreta = await bcrypt.compare(senha, candidato.senha);
    if (!senhaCorreta) return res.status(401).json({ error: 'Senha incorreta.' });

    res.json({
      role: 'candidato',
      id: candidato.id,
      nome: candidato.nome,
      aprovacao: candidato.aprovacao
    });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ error: 'Erro ao processar login.' });
  }
};

// PATCH /candidatos/aprovar/:id
const aprovar = async (req, res) => {
  try {
    await Candidato.update({ aprovacao: 'aprovado' }, { where: { id: req.params.id } });
    res.json({ message: 'Candidato aprovado com sucesso.' });
  } catch (err) {
    console.error('Erro ao aprovar candidato:', err);
    res.status(500).json({ error: 'Erro ao aprovar candidato.' });
  }
};

// PATCH /candidatos/reprovar/:id
const reprovar = async (req, res) => {
  try {
    await Candidato.update({ aprovacao: 'reprovado' }, { where: { id: req.params.id } });
    res.json({ message: 'Candidato reprovado com sucesso.' });
  } catch (err) {
    console.error('Erro ao reprovar candidato:', err);
    res.status(500).json({ error: 'Erro ao reprovar candidato.' });
  }
};

module.exports = { addCandidato, login, aprovar, reprovar };
