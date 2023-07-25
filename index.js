const express = require('express');
const app = express();
const path = require('path');
const register = require('./src/register.js');
const login = require('./src/login.js');
const socketio = require('socket.io');
const conn = require('./src/conn.js');
require('dotenv').config();


//port
app.set('port', process.env.PORT || 3007);
const server = app.listen(app.get('port'));


//sockets
const io = socketio(server);


//socket events
io.on('connection', (socket) => {
    
    socket.on('render:cliente', (data)=>{
        conn.query('SELECT * FROM `mensajes` WHERE 1', (err, results) => {
            if (err){ console.log(err) }
            else {
                data = results
                socket.emit('render:server', data)
            }
        })
    })
    

    socket.on('mensaje:cliente', (data) => {
        const usuario = data.username
        const mensaje = data.message
        conn.query(`INSERT INTO mensajes( usuario, mensaje) VALUES ('${usuario}','${mensaje}')`, 
        (err, res) => {
            if (err){
                console.log(err)
            } else {
                console.log('Mensaje enviado')
            }
        });
        io.sockets.emit('mensaje:server', data)
    });
})



//static files
app.use(express.static(path.join(__dirname, 'public')));


// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//query
app.use(register);
app.use(login);



//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './public/register.html'))
});

