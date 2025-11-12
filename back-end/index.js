// app.js (refatorado)
const express = require('express');
const hndbrs = require('express-handlebars');
const connection = require('./db/conection');

// Rotas
const candidatoRoutes = require('./routes/candidatoRoutes');
const avisoRoutes = require('./routes/avisoRoutes');
const reuniaoRoutes = require('./routes/reuniaoRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine('handlebars', hndbrs.engine());
app.set('view engine', 'handlebars');

// Rotas públicas
app.get('/', (req, res) => res.render('login'));
app.get('/candidatura', (req, res) => res.render('candidatura'));
app.get('/analise', (req, res) => res.render('analise'));
app.get('/reprovado', (req, res) => res.render('reprovado'));
app.get('/aprovado/:id', (req, res) => res.render('aprovado', { id: req.params.id }));
app.get('/admin/avisos', (req, res) => res.render('adminAvisoForm'));
app.get('/admin/reunioes', (req, res) => res.render('adminReuniaoForm'));

// Rotas de funcionalidades (MVC)
app.use(candidatoRoutes);
app.use(avisoRoutes);
app.use(reuniaoRoutes);
app.use(adminRoutes);

// Iniciar servidor
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