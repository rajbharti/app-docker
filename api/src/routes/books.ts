import express, { Router } from "express";
import { ObjectId } from "mongodb";
import { getDb, closeDb } from "../utils/db";

const router: Router = express.Router();
const collection = "tech";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const db = await getDb();

      const result = await db?.collection(collection).find({}).toArray();
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Error in querying books" });
    } finally {
      await closeDb();
    }
  })
  .post(async (req, res) => {
    try {
      const db = await getDb();

      const result = await db?.collection(collection).insertOne(req.body);
      res.status(201).send(result);
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Error in creating a new book" });
    } finally {
      await closeDb();
    }
  });

router
  .route("/:id")
  .put(async (req, res) => {
    try {
      const db = await getDb();

      const result = await db?.collection(collection).updateOne(
        { _id: new ObjectId(req.params.id) },
        {
          $set: req.body,
        }
      );
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Error in updating a book" });
    } finally {
      await closeDb();
    }
  })
  .delete(async (req, res) => {
    try {
      const db = await getDb();

      const result = await db
        ?.collection(collection)
        .deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Error in deleting a book" });
    } finally {
      await closeDb();
    }
  });

export default router;
