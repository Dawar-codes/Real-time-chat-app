import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// ✅ Use environment PORT for Render compatibility
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "https://real-time-chat-app-pi-two.vercel.app/", // Replace * with your actual frontend domain in production
  },
});
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Replace * with your actual frontend domain in production
//   },
// });

const users = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });

  socket.on("new_user", (data) => {
    users.set(socket.id, data.user);          // <-- Save the username
    socket.broadcast.emit("new_user", data.user);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    console.log(username);
    
    if (username) {
      socket.broadcast.emit("user_left", username);
      users.delete(socket.id);
      console.log(`${username} disconnected`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
