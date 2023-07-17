const mongoose = require("mongoose");
// import connection từ file db.js để sử dụng
const db = require("../db.js");
// tạo biến schema xác định cấu trúc và thuộc tính của data trong mongoose là schema
const Schema = mongoose.Schema;
//  xác định các thuộc tính của object schema như key, value trong biến Todoschema
const TodoSchema = new Schema({
  work: { type: String, default: "hahaha" },
  time: { type: String, default: "8h" },
  scripth: { type: String, default: "nhan vien part-time" },
});
// convert từ schema sang model để sử dụng trong biến todomodel
const todomodel = db.model("todomodel", TodoSchema);
function handleRequest(request, response) {
  if (request.method === "GET" && request.url === "/todo") {
    function getHandler() {
      // get all dữ liệu trong database
      todomodel.find({}).then((data) => {
        response.end(JSON.stringify(data));
        console.log("ok");
      });
    }
    // trả về thực thi function
    return getHandler();
  }
  if (request.method === "POST" && request.url === "/todo") {
    function postHandler() {
      const body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        let parsedBody = Buffer.concat(body); //
        response.end(parsedBody);
        // tạo 1 model (object) mới bằng cách copy todomodel
        const model = new todomodel();
        // key work trong model có value là parsedBody
        model.work = parsedBody;
        // lưu dữ liệu xuống database
        model.save();
      });
    }
    return postHandler();
  }
  if (request.method === "PUT" && request.url.includes("/todo")) {
    function putHandler() {
      const body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        let parsedBody = Buffer.concat(body).toString(); //
        response.end(parsedBody);
        // update attribute trong object todomodel
        todomodel.collection.updateOne(
          {
            // get id của attribute
            _id: new mongoose.Types.ObjectId(
              request.url.substring(request.url.lastIndexOf("/") + 1)
            ),
          },
          // set value cho key work của attribute
          { $set: { work: parsedBody } }
        );
        return;
      });
    }
    return putHandler();
  }
  if (request.method === "DELETE" && request.url.includes("/todo")) {
    function deleteHandler() {
      todomodel.collection.deleteOne({
        _id: new mongoose.Types.ObjectId(
          request.url.substring(request.url.lastIndexOf("/") + 1)
        ),
      });
      response.end("data deleted successfully");
      return;
    }
    // trả về thực thi function
    return deleteHandler();
  }
}
module.exports = handleRequest;
