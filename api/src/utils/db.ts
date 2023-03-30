import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

// MongoDB connection instance
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017`;
const client = new MongoClient(uri);
const defaultDB = "books";

// MongoDB connection
export async function getDb() {
  try {
    // establish connection
    await client.connect();
    console.log("[mongodb]", "connected to server.");

    // return db instance
    const db = client.db(defaultDB);
    console.log("[mongodb]", `switched to ${defaultDB} db.`);

    return db;
  } catch (e) {
    console.error(e);
  }
}

// MongoDB close connection
export async function closeDb() {
  await client.close();
  console.log("[mongodb]", "connection closed.");
}
