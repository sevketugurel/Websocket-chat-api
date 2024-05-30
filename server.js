const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Statik dosyaları sunmak için Express'i yapılandırın
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Sunucuyu 3000 portunda dinlemeye başlat
server.listen(3000, () => {
    console.log('listening on *:3000');
});
