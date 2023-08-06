const conn = require('./conn.js');
const express = require('express');
const query = express();
const path = require('path');

const updateinfo = query.post('/update', (req, res) => {
    proof = req.cookies
    data = req.body
    let useractive = proof.user
    
    let nombre = data.usuario 
    let contra = data.contra
    let newname = data.newname

    if (nombre == '' || contra == '' || newname == ''){
        res.send("campos vacios")
    } else {
        conn.query('SELECT * FROM `usuarios` WHERE nombre = ? AND contraseña = ?', [useractive, contra], (err, results) => {
            if (results.length > 0){
                conn.query('SELECT * FROM usuarios WHERE nombre = ?', [newname], (err, results) => {
                    if (results.length > 0) {
                        res.send(`<p>El nombre ${newname} ya esta en uso</p>`)
                    }
                    else {
                        conn.query(`UPDATE usuarios SET nombre = '${newname}' WHERE nombre = ? AND contraseña = ?`, [nombre, contra], (err, results) => {
                            if (err) { console.log(err) }
                            else {
                                res.clearCookie('user');
                                res.redirect('/');
                            }
                        })
                    }
                })
            } else{
                res.sendFile(path.join(__dirname, '../public/errors/404.html'));
            }
        })
    }
});


module.exports = updateinfo;