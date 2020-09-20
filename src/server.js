const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));
server.use(express.static('./public'));
server.use(express.json());

server.get('/', (req, res) => {
    return res.render('../public/index');
})

const port = server.listen(3333);

// io connection 
const io = require('socket.io')(port);

io.on('connection', (socket) => {
    socket.on('test', (data) => {
        io.sockets.emit('test', { 
            position: data.position, 
        });
        console.log(data);
    })
})
