import { ElMessage } from "element-plus";
import { io, Socket } from "socket.io-client";

const socket: Socket = io('http://localhost:9093', {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  // transports: ["websocket"],
  // path: "/socket.io",
  // query: {
  //   token: localStorage.getItem("token"),
  // },
});

socket.on("connect", () => {
  console.log("Connected to server");
})

socket.on("disconnect", () => {
  console.log("Disconnected from server");

  ElMessage.error({
    message: "Disconnected from server",
    duration: 3000,
  })
})

export default socket;