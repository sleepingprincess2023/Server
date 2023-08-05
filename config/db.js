const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  host: "127.0.0.1",
  port: 3306,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
