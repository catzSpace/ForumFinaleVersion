const socket = io()

let message = document.querySelector('#message');
const username = document.cookie
const user = username.replace('user=', ' ')
let btn = document.querySelector('#send');
let output = document.querySelector('.message_output');
let actions = document.querySelector('.actions');
const profile = document.querySelector('.profile');

profile.innerHTML = user

function pressEnter(event){  //detectar tecla "enter" para enviar mensajes
    if (event.keyCode === 13 && message.value.trim() !== ''){
        socket.emit('mensaje:cliente', {
            username: user,
            message: message.value
        });
        message.value = '';
    }
}


btn.addEventListener('click', () => {
    if (message.value.trim() !== '') {
        socket.emit('mensaje:cliente', {
            username: user,
            message: message.value
        });
        message.value = '';
    }
});

socket.emit('render:cliente', (data) => {})

socket.on('render:server', (data) => {
    data.forEach(data => {
        output.innerHTML += `<div>
                <p class="usuario" >${data.usuario}:</p>
                <p class="mensaje">${data.mensaje}</p>
            </div>
            `
    });
})

socket.on('mensaje:server', (data) => {
    output.innerHTML += `<div>
            <p class="usuario" >${data.usuario}:</p>
            <p class="mensaje">${data.mensaje}</p>
        </div>
        `
});

