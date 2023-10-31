const express = require('express');
const app = express();
const path = require('path');
const register = require('./src/register.js');
const login = require('./src/login.js');
const socketio = require('socket.io');
const conn = require('./src/conn.js');
const deleteAccount = require('./src/delete.js');
const updateinfo = require('./src/updateuser.js');
require('dotenv').config();


//port
app.set('port', process.env.PORT || 3007);
const server = app.listen(app.get('port'));


//sockets
const io = socketio(server);


//socket events
io.on('connection', (socket) => {
    
    socket.on('render:cliente', (data)=>{
        conn.query('SELECT * FROM `mensajes` WHERE 1 ', (err, results) => {
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
        const fecha = data.date
        conn.query(`INSERT INTO mensajes( usuario, mensaje, fecha ) VALUES ('${usuario}','${mensaje}', '${fecha}')`, 
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
app.use(deleteAccount);
app.use(updateinfo);



//routes
app.get('/', (req, res) => {
    res.redirect('/home')
});

app.get('/home', (req, res) => {
    let vacio = ''
    res.cookie('user', vacio)
    res.sendFile(path.join(__dirname, './public/home.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './public/register.html'))
});


//building
app.get('/music', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})

app.get('/prog', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})

app.get('/tech', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})

app.get('/dance', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})

app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})

app.get('/memes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})

app.get('/international', (req, res) => {
    res.sendFile(path.join(__dirname, './public/building.html'))
})



//complete
app.post('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, './public/settings.html'))
})

app.get('/chat', (req, res) => {
    let name = req.cookies.user
    if (!name){
        res.send('registrate o inicia sesion para acceder al chat')
    }
    else{
        res.sendFile(path.join(__dirname, './public/chat.html'))
    }
})