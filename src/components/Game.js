import Sidebar from './Sidebar.js';
import GameManager from './GameManager.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';

export default class Game {
    constructor(){
        this.start = () => this.startGame();
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

    startGame(){
        this.gameManager.startGame();
    }

    stopGame(){
        this.gameManager.stopGame();
    }
}