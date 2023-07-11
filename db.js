const mongoose = require("mongoose");
const connection = mongoose.createConnection("mongodb://localhost:27017");
connection.on("open", () => {
  console.log("Mongoose connection");
});
connection.on("erro", () => {
  console.log("Mongoose connection error");
});
module.exports = connection;
