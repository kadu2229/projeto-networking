const express = require('express');
const hndbrs = require('express-handlebars');
const app = express();
const connection = require('./db/conection');
const candidato = require('./models/candidato');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine('handlebars', hndbrs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/candidatura', (req, res) => {
  res.render('candidatura');
});

app.get('/admin',async (req, res) => {
  
  const data  = await candidato.findAll({raw: true})

  res.render('admin', {data})
})

app.get('/analise', (req, res) => {
  res.render('analise');
});

app.get('/reprovado', (req, res) => {
  res.render('reprovado');
});

app.get('/formulario-completo', (req, res) => {
  res.render('formulario-completo');
});


app.post('/addCandidato', async (req, res) => {
  const { nome, email, empresa, whyUs, senha, login } = req.body;
  let aprovacao = 'analise';

  try {
    await candidato.create({ nome, email, empresa, whyUs, senha, login, aprovacao });
    res.redirect('/');
  } catch (err) {
    console.error('Erro ao cadastrar candidato:', err);
    res.status(500).send('Erro ao cadastrar candidato');
  }
});


app.post('/aprovar/:id', async (req, res) => {
  let { id } = req.params;

  await candidato.update({aprovacao : 'aprovado'}, {where: {id:id}})
  res.redirect('/admin')
})

app.post('/reprovar/:id', async (req, res) => {
  let { id } = req.params;

  await candidato.update({aprovacao : 'reprovado'}, {where: {id:id}})
  res.redirect('/admin')
})

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    //Verificação especial para admin
    if (email === process.env.ADMIN_EMAIL && senha === process.env.ADMIN_PASSWORD) {
      return res.redirect('/admin');
    }

    //Busca o candidato comum no banco
    const user = await candidato.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    //Verifica a senha
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).send('Senha incorreta.');
    }

    //Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, aprovacao: user.aprovacao },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    //Redireciona de acordo com o status
    if (user.aprovacao === 'aprovado') {
      return res.redirect('/formulario-completo');
    } else if (user.aprovacao === 'analise') {
      return res.redirect('/analise');
    } else if (user.aprovacao === 'reprovado') {
      return res.redirect('/reprovado');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor.');
  }
});


async function startServer() {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log('Servidor rodando em http://localhost:3000');
      console.log('Conexão e sincronização com o banco bem-sucedida');
    });
  } catch (err) {
    console.error(' Erro ao conectar com o banco:', err);
  }
}

startServer();
