require('dotenv').config();
const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

(async () => {
  try {
    await connection.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
})();

module.exports = connection;
