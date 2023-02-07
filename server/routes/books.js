const { ObjectId } = require("mongodb");
const express = require("express");
const { getDb, closeDb } = require("../utils/db");

const router = express.Router();

/**
 * GET /books
 */
router.get("/", async (req, res) => {
  try {
    const db = await getDb();

    const result = await db.collection("docker").find({}).toArray();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Error in querying books" });
  } finally {
    await closeDb();
  }
});

/**
 * GET /books/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const db = await getDb();

    const result = await db
      .collection("docker")
      .find({ _id: new ObjectId(req.params.id) })
      .toArray();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Error in querying a book" });
  } finally {
    await closeDb();
  }
});

/**
 * POST /books
 */
router.post("/", async (req, res) => {
  try {
    const db = await getDb();

    const result = await db.collection("docker").insertOne(req.body);
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Error in creating a new book" });
  } finally {
    await closeDb();
  }
});

/**
 * PUT /books/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const db = await getDb();

    const result = await db.collection("docker").updateOne(
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
});

/**
 * DELETE /books/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDb();

    const result = await db
      .collection("docker")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Error in deleting a book" });
  } finally {
    await closeDb();
  }
});

module.exports = router;
