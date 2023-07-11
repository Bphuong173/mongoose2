const http = require("http");
const mongoose = require("mongoose");
const db = require("./db");
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  work: { type: String, default: "hahaha" },
  time: { type: String, default: "8h" },
  scripth: { type: String, default: "nhan vien part-time" },
});
const todomodel = db.model("todomodel", TodoSchema);
const app = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/todo") {
    todomodel.find({}).then((data) => {
      response.end(JSON.stringify(data));
      return;
    });
  }
  if (request.method === "POST" && request.url === "/todo") {
    const model = new todomodel();
    model.todomodel = todomodel;
    model.save();
    response.end(JSON.stringify(model));
    return;
  }
  if (request.method === "PUT" && request.url.includes("/todo")) {
    todomodel.collection.updateOne(
      {
        _id: new mongoose.Types.ObjectId("64a846b3efd10a97ae9062ac"),
      },
      { $set: { work: "lalalala" } }
    );
    response.end("data updated successfully");
    return;
  }
  if (request.method === "DELETE" && request.url.includes("/todo")) {
    todomodel.collection.deleteOne({
      _id: new mongoose.Types.ObjectId("64a846b3efd10a97ae9062ac"),
    });
    response.end("data deleted successfully");
    return;
  }
});
app.listen(3002, () => {
  console.log(" server listening on port 3002");
});
