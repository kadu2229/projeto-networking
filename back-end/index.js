const express = require('express');
const hndbrs = require('express-handlebars');
const app = express();
const connection = require('./db/conection');

// Models
const candidato = require('./models/candidato');
const membro = require('./models/membro');
const reuniao = require('./models/reuniao');
const aviso = require('./models/aviso');
const presenca = require('./models/presenca');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine('handlebars', hndbrs.engine());
app.set('view engine', 'handlebars');

// Página de login
app.get('/', (req, res) => res.render('login'));

// Página de candidatura
app.get('/candidatura', (req, res) => res.render('candidatura'));

// Painel admin
app.get('/admin', async (req, res) => {
  const data = await candidato.findAll({ raw: true });
  res.render('admin', { data });
});

// Páginas de status
app.get('/analise', (req, res) => res.render('analise'));
app.get('/reprovado', (req, res) => res.render('reprovado'));
app.get('/aprovado/:id', (req, res) => res.render('aprovado', { id: req.params.id }));

// Listagem de avisos
app.get('/avisos', async (req, res) => {
  try {
    const avisos = await aviso.findAll({ order: [['createdAt', 'DESC']] });
    const avisosPlain = avisos.map(a => a.get({ plain: true }));
    res.render('avisos', { avisos: avisosPlain });
  } catch (err) {
    console.error('Erro ao buscar avisos:', err);
    res.status(500).send('Erro ao carregar avisos.');
  }
});

// Formulário de aviso (admin)
app.get('/admin/avisos', (req, res) => res.render('adminAvisoForm'));

// Criação de aviso
app.post('/admin/avisos', async (req, res) => {
  const { titulo, mensagem } = req.body;
  try {
    await aviso.create({ titulo, mensagem, autorid: 1 }); // admin fixo por enquanto
    res.redirect('/avisos');
  } catch (err) {
    console.error('Erro ao criar aviso:', err);
    res.status(500).send('Erro ao criar aviso.');
  }
});

// Listagem de reuniões
app.get('/reunioes', async (req, res) => {
  try {
    const reunioes = await reuniao.findAll({ order: [['datahora', 'DESC']] });
    const reunioesPlain = reunioes.map(r => r.get({ plain: true }));
    res.render('reunioes', { reunioes: reunioesPlain });
  } catch (err) {
    console.error('Erro ao buscar reuniões:', err);
    res.status(500).send('Erro ao carregar reuniões.');
  }
});

// Formulário de reunião (admin)
app.get('/admin/reunioes', (req, res) => res.render('adminReuniaoForm'));

// Criar nova reunião
app.post('/admin/reunioes/nova', async (req, res) => {
  try {
    const { titulo, datahora, local } = req.body;

    if (!titulo || !datahora || !local) {
      return res.status(400).send('Preencha todos os campos!');
    }

    const dataConvertida = new Date(datahora);
    if (isNaN(dataConvertida.getTime())) {
      return res.status(400).send('Data e hora inválidas!');
    }

    await reuniao.create({ titulo, datahora: dataConvertida, local });
    res.redirect('/reunioes');
  } catch (err) {
    console.error('Erro ao criar reunião:', err);
    res.status(500).send('Erro ao criar reunião.');
  }
});

// Registrar presença em reunião
app.post('/reunioes/:id/checkin', async (req, res) => {
  const { id } = req.params;
  const { membroid } = req.body;

  try {
    const reuniaoEncontrada = await reuniao.findByPk(id);
    const membroEncontrado = await membro.findByPk(membroid);

    if (!reuniaoEncontrada || !membroEncontrado) {
      return res.status(404).send('Reunião ou membro não encontrado.');
    }

    await presenca.create({
      membroid,
      data: new Date().toISOString().slice(0, 10),
      presente: true,
    });

    res.redirect('/reunioes');
  } catch (err) {
    console.error('Erro ao registrar presença:', err);
    res.status(500).send('Erro ao registrar presença.');
  }
});

// Cadastro
app.post('/addcandidato', async (req, res) => {
  const { nome, email, empresa, whyUs, senha, login } = req.body;
  const aprovacao = 'analise';

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    await candidato.create({ nome, email, empresa, whyUs, senha: senhaHash, login, aprovacao });
    res.redirect('/');
  } catch (err) {
    console.error('Erro ao cadastrar candidato:', err);
    res.status(500).send('Erro ao cadastrar candidato.');
  }
});

// Aprovar Reprovar
app.post('/aprovar/:id', async (req, res) => {
  await candidato.update({ aprovacao: 'aprovado' }, { where: { id: req.params.id } });
  res.redirect('/admin');
});

app.post('/reprovar/:id', async (req, res) => {
  await candidato.update({ aprovacao: 'reprovado' }, { where: { id: req.params.id } });
  res.redirect('/admin');
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Login admin
    if (email === process.env.ADMIN_EMAIL && senha === process.env.ADMIN_PASSWORD) {
      return res.redirect('/admin');
    }

    // Login candidato
    const user = await candidato.findOne({ where: { email } });
    if (!user) return res.status(404).send('Usuário não encontrado.');

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).send('Senha incorreta.');

    const token = jwt.sign(
      { id: user.id, email: user.email, aprovacao: user.aprovacao },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    if (user.aprovacao === 'aprovado') {
      return res.redirect(`/aprovado/${user.id}`);
    } else if (user.aprovacao === 'analise') {
      return res.redirect('/analise');
    } else {
      return res.redirect('/reprovado');
    }
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).send('Erro no servidor.');
  }
});


app.post('/completarcadastro/:id', async (req, res) => {
  const { telefone, profissao, linkedin, empresaatual, descricao } = req.body;
  const { id } = req.params;

  try {
    await membro.create({
      telefone,
      profissao,
      linkedin,
      empresaatual,
      descricao,
      candidatoid: id,
    });

    res.send('Cadastro completo enviado com sucesso!');
  } catch (err) {
    console.error('Erro ao completar cadastro:', err);
    res.status(500).send('Erro ao enviar formulário completo.');
  }
});

async function startServer() {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log('✅ Servidor rodando em http://localhost:3000');
      console.log('✅ Conexão e sincronização com o banco bem-sucedida');
    });
  } catch (err) {
    console.error('❌ Erro ao conectar com o banco:', err);
  }
}

startServer();
