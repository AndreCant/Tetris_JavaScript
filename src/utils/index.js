import {START_GAME, STOP_GAME} from '/src/constants/index.js';

export function setStyle(element, objProps) {
    const keys = Object.keys(objProps);
    keys.forEach(function(key) {
        element.style[key] = objProps[key];
    });
}

export function initAbsolute(element, props) {
    element.style.position = 'absolute';

    props.forEach(function(key) {
        element.style[key] = 0;
    });
}

export function handleClickStop(){
    const button = document.getElementById('sidebarButton');
    button.removeEventListener('click', handleClickStop);
    button.innerHTML = START_GAME;

    button.addEventListener('click', handleClickStart);
}

export function handleClickStart(){
    const button = document.getElementById('sidebarButton');
    button.removeEventListener('click', handleClickStart);
    button.innerHTML = STOP_GAME;

    button.addEventListener('click', handleClickStop);
}