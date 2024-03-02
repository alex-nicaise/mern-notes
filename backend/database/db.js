// db.js
const postgres = require("postgres");
const dotenv = require("dotenv").config();

const connectionString = process.env.SUPABASE_URL;
const sql = postgres(connectionString);

module.exports = { sql };
