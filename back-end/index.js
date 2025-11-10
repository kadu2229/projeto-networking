const express = require('express');
const hndbrs = require('express-handlebars');
const app = express();
const connection = require('./db/conection');
const candidato = require('./models/candidato');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine('handlebars', hndbrs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/candidatura', (req, res) => {
  res.render('candidatura');
});

app.post('/addCandidato', async (req, res) => {
  const { nome, email, empresa, whyUs } = req.body;
  let aprovacao = 'analise'

  await candidato.create({nome, email, empresa, whyUs, aprovacao})
  res.redirect('/')
})

async function startServer() {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando em http://localhost:3000');
      console.log('✅ Conexão e sincronização com o banco bem-sucedida');
    });
  } catch (err) {
    console.error('❌ Erro ao conectar com o banco:', err);
  }
}

startServer();
