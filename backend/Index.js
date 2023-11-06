const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server , {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET" , "POST"]
    }
})

io.on('connection' , client =>{
  console.log(`connection successful ${client.id}`);
  client.on('increaseBid' , bid =>{
    console.log(`bid increase ${bid}`);
    client.broadcast.emit("newbid" , bid);
  })
})

server.listen(9000, () => {
  console.log(`server started `);
});
