// import thư viện http để sử dụng trong biến http
const http = require("http");
// import thư viện mongoose để sử dụng trong biến mongoose

const handleRequest = require("./todo/todo.js");
// khởi tại sever trong biến app để lắng nghe request của user và response lại trên port 3002
const app = http.createServer(handleRequest);

app.listen(3002, () => {
  console.log(" server listening on port 3002");
});
