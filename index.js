const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("sendLocation", (data) => {
    console.log(data);
    io.emit("receiveLocation", { id: data.id, ...data });
  });
  // Get handshaking data
  socket.on("handshake", (data) => {
    console.log(data);
  });
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
