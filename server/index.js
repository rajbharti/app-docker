const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3001;
const booksRouter = require("./routes/books");

// HTTP logger
app.use(morgan("short"));

// parses incoming requests in body with JSON payloads.
app.use(express.json());

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

app.listen(port, () => console.log(`Server listening at port ${port}`));
