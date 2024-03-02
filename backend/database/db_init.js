const { sql } = require("./db");

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    // Create User Table in Database
    const createTable = await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(50) UNIQUE NOT NULL
        );
  `;
    console.log("Users table created...");

    return { createTable };
  } catch (error) {
    console.error(error.message);
  }
}

// Create Notes Table in Database
async function createNotesTable() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    const createTable = await sql`
          CREATE TABLE IF NOT EXISTS notes (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              body TEXT NOT NULL,
              user_id UUID REFERENCES users(id)
          );
    `;
    console.log("Notes table created...");

    return { createTable };
  } catch (error) {
    console.error(error.message);
  }
}

// Run both setup functions
async function main() {
  try {
    await seedUsers();
    await createNotesTable();

    console.log("All functions successful...");
    sql.end();
    process.exit();
  } catch (error) {
    console.error(error.message);
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
