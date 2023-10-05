const socket = io()

//llamando elementos 
let message = document.querySelector('#message');
const usernamecookie = document.cookie
const user = usernamecookie.replace('user=', ' ')
let btn = document.querySelector('#send');
let output = document.querySelector('.message_output');
let actions = document.querySelector('.actions');
const profile = document.querySelector('.profile');

// extrayendo fecha del mensaje
const date = new Date();
let año = date.getFullYear()
let mes = date.getMonth() + 1
let dia = date.getDate()
let act = `${año}-${mes}-${dia}` //devolviendo un string con toda la fecha

//agregando el nombre de usuario en el front 
profile.innerHTML = user

function pressEnter(event){  //detectar tecla "enter" para enviar mensajes
    if (event.keyCode === 13 && message.value.trim() !== ''){
        socket.emit('mensaje:cliente', {
            username: user,
            message: message.value,
            date: act
        });
        message.value = '';
    }
}


btn.addEventListener('click', () => { //enviar mensajes con boton en pantalla
    if (message.value.trim() !== '') {
        socket.emit('mensaje:cliente', {
            username: user,
            message: message.value,
            date: act
        });
        message.value = '';
    }
});

//cargar los mensajes previos a cada usuario cuando se conecten al chat
socket.emit('render:cliente', (data) => {})

//reciebiendo los datos del servidor para cargar los mensajes
socket.on('render:server', (data) => {
    data.forEach(data => {
        output.innerHTML += `<div class="mens">
                <p> <span class="usuario">${data.usuario}</span> : ${data.mensaje}</p>
                <p class="fecha">${data.fecha}</p>
            </div>
            `
    });
})

//cargando los nuevos mensajes enviados
socket.on('mensaje:server', (data) => {
    output.innerHTML += `<div class="mens">
            <p> <span class="usuario">${data.username}</span> : ${data.message}</p>
            <p class="fecha">${data.date}</p>
        </div>
        `
});
