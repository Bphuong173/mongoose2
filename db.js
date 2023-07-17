const mongoose = require("mongoose");
const connection = mongoose.createConnection("mongodb://localhost:27017");
connection.on("open", () => {
  console.log("Mongoose connection");
});
connection.on("erro", () => {
  console.log("Mongoose connection error");
});
module.exports = connection;

// const Schema = mongoose.Schema;

// const TodoSchema = new Schema({
//   todo: { type: String, default: "hahaha" },
//   xxx: { type: String, default: "ooo" },
// });
// const TodoModel = mongoose.model("todo", TodoSchema);

// function addTodo(todo) {
//   const model = new TodoModel();
//   model.todo = todo;
//   model.save().catch((error) => {
//     console.log(error);
//   });
// }
// function getAll() {
//   TodoModel.find({}).then((data) => {
//     console.log(data);
//   });
// }
// function deleteOne() {
//   TodoModel.deleteOne({
//     _id: new mongoose.Types.ObjectId("64a29844013ca39d7c2450ce"),
//   }).then((data) => {});
// }
// function update() {
//   TodoModel.updateOne({
//     _id: new mongoose.Types.ObjectId("649f997e1547ec216bbd1b81"),
//   });
// }
// addTodo("ok fen");
// // getAll();
// // update();
// // deleteOne();
