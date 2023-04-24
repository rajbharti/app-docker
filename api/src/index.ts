import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import booksRouter from "./routes/books";

const app: Express = express();
const port = 3001;

// parses incoming requests in body with JSON payloads.
app.use(express.json());

// enable cors
const options = {
  origin: ["http://localhost:3000"],
};
app.use(cors(options));

// HTTP logger
app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send(`
  <h2>Use following endpoints</h2>
  <pre>
    GET:     /books
    GET:     /books/:id
    POST:    /books
    PUT:     /books/:id
    DELETE:  /books/:id
  </pre>`);
});

app.use("/books", booksRouter);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
