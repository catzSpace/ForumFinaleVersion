# ForumFinaleVersion

Proyecto de certificación escolar un foro / chat con actualizacion en tiempo real, permite a los usuarios, registrarse, loguearse, borrar su cuenta y actualizar su nombre de usuario

# Tecnologias 
* Nodejs: Entorno de desarrollo en el cual se monto el proyecto.

```lua
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3007);
const server = app.listen(app.get('port'));
```

* Socket.io: Modulo de Node que permite la conexión instantanea entre usuarios conectados (sockets).

```lua
socket.on('render:cliente', (data)=>{
        conn.query('SELECT * FROM `mensajes` WHERE 1 ', (err, results) => {
            if (err){ console.log(err) }
            else {
                data = results
                socket.emit('render:server', data)
            }
        })
    })
```

* Nodemon: Dependencia de desarrollo que permite apreciar los errores en el servidor en tiempo real, ademas de proveer la actualización automatica del mismo. 

```lua
"dev": "nodemon index.js"
npm run dev
```

# Capturas

<img src="https://github.com/catzSpace/ForumFinaleVersion/assets/133279982/83ace761-b230-4112-bc7f-210c6437a6f3" />
<img src="https://github.com/catzSpace/ForumFinaleVersion/assets/133279982/b84902e7-12a7-4511-ab16-abc8bf189250" />
