// app.js (API REST)
const express = require('express');
const connection = require('./db/conection');

// Rotas (MVC)
const candidatoRoutes = require('./routes/candidatoRoutes');
const avisoRoutes = require('./routes/avisoRoutes');
const reuniaoRoutes = require('./routes/reuniaoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas da API (todas começam com /api)
app.use('/api', candidatoRoutes);
app.use('/api', avisoRoutes);
app.use('/api', reuniaoRoutes);
app.use('/api', adminRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ mensagem: 'API ativa e rodando 🚀' });
});

// Iniciar servidor
async function startServer() {
  try {
    await connection.sync();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log('✅ Conexão e sincronização com o banco bem-sucedida');
    });

  } catch (err) {
    console.error('❌ Erro ao conectar com o banco:', err);
  }
}

startServer();
