const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Docker Express Mongo Demo");
});

app.listen(port, () => console.log(`Server listening at port ${port}`));
