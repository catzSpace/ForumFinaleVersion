const conn = require('./conn.js');
const express = require('express');
const query = express();
const cookieParser = require('cookie-parser');
const path = require('path');
query.use(cookieParser())



const deleteAccount = query.post('/delete', (req, res) => {
    test = req.cookies
    data = req.body
    let useractive = test.user
    console.log(useractive)
    let nombre = data.usuario
    let contra = data.contra
    console.log(nombre, contra)
    if (data.nombre != '' && data.contra != ''){
        conn.query('SELECT * FROM `usuarios` WHERE nombre = ? AND contraseña = ?', [nombre, contra], (err, results) => {
            if (results.length >= 1){
                conn.query('DELETE FROM `usuarios` WHERE nombre = ? AND contraseña = ?', [useractive, contra], (err, results) => {
                    if (err) { console.log(err) }
                    else {
                        res.clearCookie('user');
                        res.redirect('/')
                    }
                })
            } else {
                res.sendFile(path.join(__dirname, '../public/404.html'));
            }
        })
    }
})


module.exports = deleteAccount; 