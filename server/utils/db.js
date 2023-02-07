require("dotenv").config();
const { MongoClient } = require("mongodb");

// MongoDB connection instance
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017`;
const client = new MongoClient(uri);

// MongoDB connection and db return
async function getDb() {
  try {
    await client.connect();
    console.log("mongodb:", "connected to server.");
    const db = await client.db("books");
    console.log("mongodb:", "connected to 'books' db.");

    return db;
  } catch (e) {
    console.error(e);
  }
}

// MongoDB close connection
async function closeDb() {
  await client.close();
  console.log("mongodb:", "connection closed.");
}

module.exports = {
  getDb,
  closeDb,
};
