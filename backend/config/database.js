const { log } = require("console");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: true,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao banco com sucesso"))
  .catch((error) => console.log("Erro ao conectar no banco: " + error));

module.exports = sequelize;
