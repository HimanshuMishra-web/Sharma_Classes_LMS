const express =require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const fileupload = require("express-fileupload");
const app = express();
const http = require("http");
const bodyParser = require('body-parser');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.use(cors({
    origin:["http://localhost:5173"],
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());
app.use(fileupload());
app.use(express.static("assets/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  

module.exports = {
    app,
    server
};