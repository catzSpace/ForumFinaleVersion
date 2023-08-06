const mysql = require('mysql');
require('dotenv').config();


let conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.BASE
});

conn.connect((err) => {
    if (err) {
        console.log('database conection failed', err)
    }
    else {
        console.log('connection done!')
    }
});


module.exports = conn;