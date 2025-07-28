import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ✅ Use environment PORT for Render compatibility
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "*", // Replace * with your actual frontend domain in production
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });

  socket.on("new_user", (data) => {
    socket.broadcast.emit("new_user", data.user);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
