import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors"
import {Server} from "socket.io";
// mongo connection
import "../config/mongo.js";
// socket configuration
import WebSockets from "../utils/WebSockets.js";
// routes
import indexRouter from "../routes/login.js";
import userRouter from "../routes/user.js";
import chatRoomRouter from "../routes/chatRoom.js";
import deleteRouter from "../routes/delete.js";
// middlewares
import {decode} from '../middlewares/auth.js'

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/user", userRouter);
app.use("/login", indexRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({success: false, message: 'API endpoint doesn\'t exist'})
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Create socket connection */
const socketio = new Server(server);
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)

/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
    console.log(`Listening on port: http://localhost:${port}/`)
});