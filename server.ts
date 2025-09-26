import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on('disconnect', reason => {
    console.log('user disconnect: ', reason)
  })

  socket.on("value:get", (data, cb) => {
    console.log("value:get", data);
    // socket.send("msg received");
    cb({
      found: true,
      topic: "crec-1398-opc-data",
      label: "刀盘转速",
      source: "opc_low",
      receivedAt: 1758850769953,
      value: 123.4,
      key: "db40_20",
    });
  });
});

httpServer.listen(9093, () => {
  console.log("服务器已启动，监听端口 9093");
});

// import express from 'express';
// import { Server } from 'http';
// import { WebSocketServer } from 'ws';

// const app = express();
// const server = new Server(app);
// const wss = new WebSocketServer({ server });

// wss.on('connection', (ws, req) => {
//    ws.send('你连接成功了');
//    ws.on('message', (msg) => {
//        console.log(`收到消息：${msg}`);
//        ws.send('消息已收到');
//    });
// });
// server.listen(9093, () => {
//    console.log('服务器已启动，监听端口 8081');
// });
