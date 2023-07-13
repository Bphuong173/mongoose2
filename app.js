// import thư viện http để sử dụng trong biến http
const http = require("http");
// import thư viện mongoose để sử dụng trong biến mongoose
const mongoose = require("mongoose");
// import connection từ file db.js để sử dụng
const db = require("./db");
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
// khởi tại sever trong biến app để lắng nghe request của user và response lại trên port 3002
const app = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/todo") {
    // get all dữ liệu trong database
    todomodel.find({}).then((data) => {
      response.end(JSON.stringify(data));
      return;
    });
  }
  if (request.method === "POST" && request.url === "/todo") {
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
      return;
    });
  }
  if (request.method === "PUT" && request.url.includes("/todo")) {
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
  if (request.method === "DELETE" && request.url.includes("/todo")) {
    todomodel.collection.deleteOne({
      _id: new mongoose.Types.ObjectId(
        request.url.substring(request.url.lastIndexOf("/") + 1)
      ),
    });
    response.end("data deleted successfully");
    return;
  }
});
app.listen(3002, () => {
  console.log(" server listening on port 3002");
});
