// // db.js
// const postgres = require("postgres");
const dotenv = require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// const connectionString = process.env.SUPABASE_URL;
// const sql = postgres(connectionString);

// module.exports = { sql };

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = { supabase };
