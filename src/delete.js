const conn = require('./conn.js');
const express = require('express');
const query = express();
const cookieParser = require('cookie-parser');
const path = require('path');
query.use(cookieParser());


const deleteAccount = query.post('/delete', (req, res) => {
    proof = req.cookies // llamando las cookies ya definidas (nombre de usuario)
    data = req.body
    let useractive = proof.user

    let nombre = data.usuario
    let contra = data.contra

    if (data.nombre != '' && data.contra != ''){
        conn.query('SELECT * FROM `usuarios` WHERE nombre = ? AND contraseña = ?', [useractive, contra], (err, results) => {
            if (results.length > 0){
                conn.query('DELETE FROM `usuarios` WHERE nombre = ? AND contraseña = ?', [nombre, contra], (err, results) => {
                    if (err) { console.log(err) }
                    else {
                        res.clearCookie('user');
                        res.redirect('/')
                    }
                })
            } else {
                res.sendFile(path.join(__dirname, '../public/errors/404.html'));
            }
        })
    } else {
        res.send("campos vacios")
    }
})


module.exports = deleteAccount; 