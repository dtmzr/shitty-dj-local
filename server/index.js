const path = require("path");
const dotenv = require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const generateQR = require("./utils/generateQR");
const routes = require("./routes");
const socketHandler = require("./socketHandler");

// init app
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// generate qr with server ip
generateQR();

// middlewares
app.use(express.json());
app.use(
  express.static("dist", {
    extensions: ["htm", "html"]
  })
);
app.use(express.static("public"));
app.use(routes);

// socket for playlist
socketHandler(io);

// start app
server.listen(process.env.PORT, () => {
  console.log(`Shitty DJ on floor ${process.env.PORT}!`);
});
