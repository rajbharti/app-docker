require("dotenv").config();
const { MongoClient } = require("mongodb");

// MongoDB connection instance
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_USERNAME}@localhost:27017`;
const client = new MongoClient(uri);

// MongoDB connection
async function dbConnection() {
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
async function closeDbConnection() {
  await client.close();
  console.log("mongodb:", "connection closed.");
}

module.exports = {
  dbConnection,
  closeDbConnection,
};
