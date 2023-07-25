const express = require('express');
const query = express();
const conn = require('./conn.js');


const register = query.post('/', (req, res) => {
    datos = req.body
    let nombre = datos.usuario
    let contra = datos.contra
    console.log("nombre:", nombre, "contraseña:", contra);
    if (datos.nombre != '' && datos.contra != ''){
        conn.query('SELECT * FROM usuarios WHERE nombre = ? ', [nombre], (err, results) => {
            if (results.length >= 1) {
                res.send('usuario ya existente');
            } else {
                conn.query(`INSERT INTO usuarios(id, nombre, contraseña) VALUES ('','${nombre}','${contra}')`, 
                (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('yesss');
                        res.redirect('/');
                    }
                })
            } 
        })
    } else{
        res.send('rellena los campos');
    }
});


module.exports = register;