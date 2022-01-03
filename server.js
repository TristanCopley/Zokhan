const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let connections = [];

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile('index.html');

});

io.on('connection', (socket) => {

    // Add new socket to connections array
    connections.push(socket.id)
    socket.join(socket.id)

    // Clean up connections array
    socket.on('disconnect', () => {

        connections.splice(connections.indexOf(socket.id), 1);
        io.emit('chat message', 'A user disconnected');

    });

});

server.listen(port, () => {

    console.log(`listening on *:${port}`);

});