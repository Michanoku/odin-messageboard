require("dotenv").config();
require("dotenv").config();
const { Pool } = require("pg");
const isDev = process.env.NODE_ENV === "development";


module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432 // The default port
});