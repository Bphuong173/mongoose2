const express = require("express");
const app = express();
const port = 3000;
const tasks = require("./routers/tasks.js");
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/tasks", tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
