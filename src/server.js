const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mysql = require("mysql");
require("dotenv").config();

const port = process.env.PORT;

//MySQL information taken from .env file
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

//create MySQL connection 
const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});

//throw error if connection failed
db.getConnection( (err, connection)=> {
  if (err) throw (err);
  console.log ("DB connected successful: " + connection.threadId);
});

app.use("/public/", express.static(__dirname + '/public'));

//show html file to client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log("user connected");

    //emit message from msg form to all connected clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

        //create sql INSERT query
        var sqlInsert = "INSERT INTO history VALUES (?, ?)";
        const insertQuery = mysql.format(sqlInsert, ['user1', msg]);

        //execute sql query
        db.query(insertQuery, function (err, result){
          if(err) throw err;
          console.log("message inserted");
        });
    });
});

//listen to port 3000
server.listen(port, () => {
  console.log('listening on ' + port);
});