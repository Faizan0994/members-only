#! usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(200),
  admin BOOLEAN,
  member BOOLEAN
);

CREATE TABLE IF NOT EXISTS posts(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (100),
  message VARCHAR (250),
  author_id INTEGER,
  time TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO users (name, username, password, admin, member) VALUES ('Akif Emir', 'akif1234', 1234, FALSE, FALSE);

INSERT INTO posts(title, message, author_id) VALUES ('Are people on internet real?', 'Everyone I ever met online may have been a chatbot or something, I will never know for sure.', 1);
`;

async function main() {
  try {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DB,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("process completed successfully");
  } catch (error) {
    console.error(error);
  }
}

main();
