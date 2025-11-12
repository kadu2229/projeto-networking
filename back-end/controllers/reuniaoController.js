const Reuniao = require('../models/reuniao');
const Presenca = require('../models/presenca');
const Membro = require('../models/membro');

const listarReunioes = async (req, res) => {
  try {
    const reunioes = await Reuniao.findAll({ order: [['datahora', 'DESC']] });
    res.render('reunioes', { reunioes: reunioes.map(r => r.get({ plain: true })) });
  } catch (err) {
    console.error('Erro ao buscar reuniões:', err);
    res.status(500).send('Erro ao carregar reuniões.');
  }
};

const criarReuniao = async (req, res) => {
  try {
    const { titulo, datahora, local } = req.body;
    if (!titulo || !datahora || !local) return res.status(400).send('Preencha todos os campos!');

    const dataConvertida = new Date(datahora);
    if (isNaN(dataConvertida.getTime())) return res.status(400).send('Data e hora inválidas!');

    await Reuniao.create({ titulo, datahora: dataConvertida, local });
    res.redirect('/reunioes');
  } catch (err) {
    console.error('Erro ao criar reunião:', err);
    res.status(500).send('Erro ao criar reunião.');
  }
};

const registrarPresenca = async (req, res) => {
  const { id } = req.params;       // id da reunião
  const membroid = req.member.id;  // pega o membro logado do token JWT

  try {
    const reuniaoEncontrada = await Reuniao.findByPk(id);
    const membroEncontrado = await Membro.findByPk(membroid);

    if (!reuniaoEncontrada || !membroEncontrado)
      return res.status(404).send('Reunião ou membro não encontrado.');

    await Presenca.create({
      membroid,
      data: new Date().toISOString().slice(0, 10),
      presente: true,
    });

    res.redirect('/reunioes');
  } catch (err) {
    console.error('Erro ao registrar presença:', err);
    res.status(500).send('Erro ao registrar presença.');
  }
};

module.exports = { listarReunioes, criarReuniao, registrarPresenca };
