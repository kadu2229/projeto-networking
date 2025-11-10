const { Sequelize } = require('sequelize');

const connection = new Sequelize('postgresql://postgres.gmydcnrcohdqvkffhzeb:1234@aws-1-us-east-1.pooler.supabase.com:5432/postgres', {
  host: 'db.gmydcnrcohdqvkffhzeb.supabase.co',
  dialect: 'postgres',
  port: 5432,
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
    console.log('✅ Conexão com o banco estabelecida com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar:', err);
  }
})();

module.exports = connection;
