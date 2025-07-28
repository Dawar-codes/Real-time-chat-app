import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.emit("user_typing", data)
    
  })

  socket.on("new_user", (data) => {
    socket.broadcast.emit("new_user", data.user);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
