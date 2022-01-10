const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PG_PASSWORD || 'HSU1',
  database: 'postgres'
});

client.connect(err => {
  if (err) {
    console.error('connect failed', err.stack, "error message", err.message);
  }
  console.log('connected');
});


module.exports = client;
