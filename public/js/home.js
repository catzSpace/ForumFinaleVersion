//animation intro
let intro = document.querySelector('.intro');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        intro.style.top = '-100vh'
    }, 800);

}); 



//switch theme

const btn = document.querySelector('.changetheme');
const body = document.querySelector('body');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const enca = document.querySelector('.enCont');

btn.addEventListener('click', () => {

    //body
    body.classList.toggle('dark');
    body.classList.toggle('light');

    enca.classList.toggle('light');
    enca.classList.toggle('dark');
    if (body.classList.contains('dark')){
        localStorage.setItem('dark', 'true');
    } else {
        localStorage.setItem('dark', 'false')
    }
    if (body.classList.contains('light')){
        localStorage.setItem('light', 'true');
    } else {
        localStorage.setItem('light', 'false')
    }


    //boton
    btn.classList.toggle('orange');
    btn.classList.toggle('purple');

    if(btn.classList.contains('orange')){
        localStorage.setItem('orange', 'true');
    } else {
        localStorage.setItem('orange', 'false');
    }
    if (btn.classList.contains('purple')){
        localStorage.setItem('purple', 'true');
    } else {
        localStorage.setItem('purple', 'false');
    }


    //sun
    sun.classList.toggle('visible');
    sun.classList.toggle('invisible');

    if (sun.classList.contains('visible')){
        localStorage.setItem('visiblesun', 'true');
    } else {
        localStorage.setItem('visiblesun', 'false');
    }
    if (sun.classList.contains('invisible')){
        localStorage.setItem('invisiblesun', 'true');
    } else {
        localStorage.setItem('invisiblesun', 'false');
    }
    
    //moon
    moon.classList.toggle('invisible');
    moon.classList.toggle('visible');

    if (moon.classList.contains('invisible')){
        localStorage.setItem('invisiblemoon', 'true');
    } else {
        localStorage.setItem('invisiblemoon', 'false');
    }
    if (moon.classList.contains('visible')){
        localStorage.setItem('visiblemoon', 'true');
    } else {
        localStorage.setItem('visiblemoon', 'false');
    }
});

//body
if (localStorage.getItem('dark') == 'true'){
    body.classList.remove('light');
    body.classList.add('dark');

    enca.classList.remove('light');
    enca.classList.add('dark');
} else{
    body.classList.remove('dark');
    body.classList.add('light');

    enca.classList.remove('dark');
    enca.classList.add('light');
}
if (localStorage.getItem('light') == 'true') {
    body.classList.add('light');
    body.classList.remove('dark');

    enca.classList.add('light');
    enca.classList.remove('dark');
} else {
    body.classList.add('dark');
    body.classList.remove('light');

    enca.classList.add('dark');
    enca.classList.remove('light');
}

//button
if (localStorage.getItem('orange') == 'true'){
    btn.classList.remove('purple');
    btn.classList.add('orange');
} else{
    btn.classList.remove('orange');
    btn.classList.add('purple');
}
if (localStorage.getItem('purple') == 'true') {
    btn.classList.add('purple');
    btn.classList.remove('orange');
} else {
    btn.classList.add('orange');
    btn.classList.remove('purple');
}

//sun
if (localStorage.getItem('visiblesun') == 'true'){
    sun.classList.remove('invisible');
    sun.classList.add('visible');
} else{
    sun.classList.remove('visible');
    sun.classList.add('invisible');
}
if (localStorage.getItem('invisiblesun') == 'true') {
    sun.classList.add('invisible');
    sun.classList.remove('visible');
} else {
    sun.classList.add('visible');
    sun.classList.remove('invisible');
}

//moon
if (localStorage.getItem('invisiblemoon') == 'true'){
    moon.classList.remove('visible');
    moon.classList.add('invisible');
} else{
    moon.classList.remove('invisible');
    moon.classList.add('visible');
}
if (localStorage.getItem('visiblemoon') == 'true') {
    moon.classList.add('visible');
    moon.classList.remove('invisible');
} else {
    moon.classList.add('invisible');
    moon.classList.remove('visible');
}
