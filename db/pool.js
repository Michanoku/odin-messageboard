require("dotenv").config();
require("dotenv").config();
const { Pool } = require("pg");
const isDev = process.env.NODE_ENV === "development";

const host = isDev ? "localhost" : "";

module.exports = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  database: "messages",
  password: process.env.DB_PASSWORD,
  port: 5432 // The default port
});