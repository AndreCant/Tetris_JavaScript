import {initAbsolute, setStyle} from '/src/utils/index.js';
import {START_GAME, STOP_GAME} from '/src/constants/index.js';

export default class Sidebar {

    constructor(){
        this.levelHandler = () => this.selectLevel();
        this.handleClickStart = () => this.clickStart();
        this.handleClickStop = () => this.clickStop();

        this.element = this.initSidebar();
    }

    get playButton(){
        return this._playButton;
    }
    set playButton(playButton){
        this._playButton = playButton;
    }

    get levelButton(){
        return this._levelButton;
    }
    set levelButton(levelButton){
        this._levelButton = levelButton;
    }

    initSidebar(){
        const sidebar = this.createSidebar();
        this.playButton = this.createPlayButton();
        this.levelButton = this.createLevelButton();

        sidebar.appendChild(this.levelButton);
        sidebar.appendChild(this.playButton);

        return sidebar;
    }

    createSidebar(){
        const sidebar = document.createElement('aside');
        sidebar.setAttribute('id', 'sidebar');
        initAbsolute(sidebar, ['top', 'bottom', 'left']);
        setStyle(sidebar, {
            width: '30%',
            border: '3px solid black',
            backgroundColor: '#d1d1d1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        });

        return sidebar;
    }

    createPlayButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'playButton');
        button.innerHTML = START_GAME;
        button.addEventListener('click', this.handleClickStart);

        return button;
    }

    createLevelButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'levelButton');
        button.innerHTML = 'LEVEL: 1';
        button.addEventListener('click', this.levelHandler);

        return button;
    }

    selectLevel(){
        switch (this.levelButton.innerHTML) {
            case 'LEVEL: 1': this.levelButton.innerHTML = 'LEVEL: 5';
                break;
            case 'LEVEL: 5': this.levelButton.innerHTML = 'LEVEL: 10';
                break;
            case 'LEVEL: 10': this.levelButton.innerHTML = 'LEVEL: 15';
                break;
            case 'LEVEL: 15': this.levelButton.innerHTML = 'LEVEL: 20';
                break;
            case 'LEVEL: 20': this.levelButton.innerHTML = 'LEVEL: 25';
                break;
            case 'LEVEL: 25': this.levelButton.innerHTML = 'LEVEL: 1';
                break;
            default:
                break;
        }
    }

    clickStop(){
        this.playButton.removeEventListener('click', this.handleClickStop);
        this.playButton.innerHTML = START_GAME;
        this.playButton.addEventListener('click', this.handleClickStart);

        this.levelButton.removeAttribute('disabled');

        document.getElementById('main').dispatchEvent(new CustomEvent('stop'));
    }
    
    clickStart(){
        this.playButton.removeEventListener('click', this.handleClickStart);
        this.playButton.innerHTML = STOP_GAME;
        this.playButton.addEventListener('click', this.handleClickStop);

        this.levelButton.setAttribute('disabled', true);

		document.getElementById('main').dispatchEvent(new CustomEvent('start'));
    }
}
