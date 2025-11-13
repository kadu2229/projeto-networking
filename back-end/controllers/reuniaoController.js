const Reuniao = require('../models/reuniao');
const Presenca = require('../models/presenca');
const Membro = require('../models/membro');

// GET /reunioes
const listarReunioes = async (req, res) => {
  try {
    const reunioes = await Reuniao.findAll({ order: [['datahora', 'DESC']] });
    res.json(reunioes); // 👈 retorna JSON em vez de renderizar view
  } catch (err) {
    console.error('Erro ao buscar reuniões:', err);
    res.status(500).json({ error: 'Erro ao carregar reuniões.' });
  }
};

// POST /reunioes
const criarReuniao = async (req, res) => {
  try {
    const { titulo, datahora, local } = req.body;
    if (!titulo || !datahora || !local)
      return res.status(400).json({ error: 'Preencha todos os campos!' });

    const dataConvertida = new Date(datahora);
    if (isNaN(dataConvertida.getTime()))
      return res.status(400).json({ error: 'Data e hora inválidas!' });

    const novaReuniao = await Reuniao.create({
      titulo,
      datahora: dataConvertida,
      local
    });

    res.status(201).json(novaReuniao); // 👈 retorna a reunião criada
  } catch (err) {
    console.error('Erro ao criar reunião:', err);
    res.status(500).json({ error: 'Erro ao criar reunião.' });
  }
};

// POST /reunioes/:id/presenca
const registrarPresenca = async (req, res) => {
  const { id } = req.params; // id da reunião
  const membroid = req.member?.id; // obtido do token (futuramente JWT)

  try {
    const reuniaoEncontrada = await Reuniao.findByPk(id);
    const membroEncontrado = await Membro.findByPk(membroid);

    if (!reuniaoEncontrada || !membroEncontrado)
      return res.status(404).json({ error: 'Reunião ou membro não encontrado.' });

    const presenca = await Presenca.create({
      membroid,
      data: new Date().toISOString().slice(0, 10),
      presente: true,
    });

    res.status(201).json({
      message: 'Presença registrada com sucesso!',
      presenca
    });
  } catch (err) {
    console.error('Erro ao registrar presença:', err);
    res.status(500).json({ error: 'Erro ao registrar presença.' });
  }
};

module.exports = { listarReunioes, criarReuniao, registrarPresenca };
