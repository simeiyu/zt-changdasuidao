import { io, Socket } from "socket.io-client";

const socket: Socket = io({
  path: "/socket.io",
  autoConnect: false
});

socket.on("connect", () => {
  console.log("Connected to server");
})

socket.on("disconnect", () => {
  console.log("Disconnected from server");
})

export default socket;