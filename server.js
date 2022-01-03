const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const hostname = '192.168.128.1';
const io = new Server(server);

let connections = [];
let data = [];

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile('index.html');

});




io.on('connection', (socket) => {

    // Add new id to connections and data array
    connections.push(socket.id);
    data.push(null);

    // Send socket identification to client // Currently ALL
    io.to(socket.id).emit('identify', socket.id);

    // Updates positions
    socket.on('updatePosition', (position) => {

        let index = connections.indexOf(socket.id);
        data[index] = position

        io.emit('positionData', data);

    })


    // Clean up connections array
    socket.on('disconnect', () => {

        let index = connections.indexOf(socket.id)
        data.splice(index, 1);
        connections.splice(index, 1);

    });

});




server.listen(port,() => {

    console.log(`listening on *:${hostname}:${port}`);

});