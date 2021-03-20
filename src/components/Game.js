import Sidebar from './Sidebar.js';
import GameManager from './GameManager.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';

export default class Game {
    constructor(){
        this.start = event => this.startGame(event);
        this.stop = () => this.stopGame();
        this.initGame();
    }

    get gameManager(){
        return this._gameManager;
    }
    set gameManager(gameManager){
        this._gameManager = gameManager;
    }

    get sidebar(){
        return this._sidebar;
    }
    set sidebar(sidebar){
        this._sidebar = sidebar;
    }

    initGame(){
        const appContainer = this.createContainer();

        this.sidebar = new Sidebar();
        this.gameManager = new GameManager();

        appContainer.appendChild(this.sidebar.element);
        appContainer.appendChild(this.gameManager.element);

        document.body.appendChild(appContainer);

        // this.setBoardDimension();
    }

    createContainer(){
        const appContainer = document.createElement('main');
        appContainer.setAttribute('id', 'main');
        appContainer.addEventListener('start', this.start);
        appContainer.addEventListener('stop', this.stop);
        initAbsolute(appContainer, ['top', 'bottom', 'left', 'right']);
        setStyle(document.body, {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            margin: 0,
        });
        document.body.style.position = 'relative';

        return appContainer;
    }

    // setBoardDimension(){
    //     const article = document.getElementById('main-content');
    //     const canvas = document.getElementById('screen');

    //     const screen_w = article.offsetWidth;
    //     const screen_h = article.offsetHeight;
    //     const margin = parseInt(window.getComputedStyle(article).margin);

    //     let width = (screen_w - (2 * margin)) / 2;
    //     let height = screen_h - (2 * margin);
    //     let newHeight = height;

    //     for (let index = height; index > 0; index--) {
    //         if ((index / width) === 2) {
    //             newHeight = index;
    //             break;
    //         }
    //     }

    //     console.log(screen_w, screen_h, margin);
    // }

    startGame(event){
        this.gameManager.setLevel(event.detail);
        this.gameManager.startGame();
    }

    stopGame(){
        this.gameManager.stopGame();
    }
}