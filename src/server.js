const { Socket } = require('dgram');
const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));
server.use(express.static('./public'));
server.use(express.json());

server.get('/', (req, res) => {
    return res.render('../public/index');
})

server.listen(3333);