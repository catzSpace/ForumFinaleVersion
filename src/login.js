const express = require('express');
const query = express();
const conn = require('./conn.js');
const path = require('path');


const login = query.post('/chat', (req, res) => {
    datos = req.body
    let nombre = datos.usuario
    let contra = datos.contra
    if (nombre && contra){
        conn.query('SELECT * FROM usuarios WHERE nombre = ? AND contraseña = ? ', [nombre, contra], (err, results) => {
            if (results.length == 0) {
                res.sendFile(path.join(__dirname, '../public/404.html'));
            } else {
                res.cookie('user', nombre);
                res.sendFile(path.join(__dirname, '../public/chat.html'));
            }
        })
    } else {
        res.send('campos vacios');
    }
});





module.exports = login;