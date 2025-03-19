const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'mydb';

let db;

async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('Połączono z MongoDB');
    db = client.db(DATABASE_NAME);
    return db;
  } catch (err) {
    console.error('Błąd połączenia z MongoDB:', err);
    process.exit(1);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };