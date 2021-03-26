import Sidebar from './Sidebar.js';
import GameManager from './GameManager.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';

export default class Game {
    constructor(){
        this.start = event => this.startGame(event);
        this.stop = () => this.stopGame();
        this.restart = () => this.restartGame();

        this.score = 0;
        this.level = 1;

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

    get appContainer(){
        return this._appContainer;
    }
    set appContainer(appContainer){
        this._appContainer = appContainer;
    }

    initGame(){
        this.appContainer = this.createContainer();

        this.sidebar = new Sidebar();
        this.gameManager = new GameManager();

        this.appContainer.appendChild(this.sidebar.element);
        this.appContainer.appendChild(this.gameManager.element);

        document.body.appendChild(this.appContainer);
    }

    createContainer(){
        const appContainer = document.createElement('main');
        appContainer.setAttribute('id', 'main');
        appContainer.addEventListener('start', this.start);
        appContainer.addEventListener('stop', this.stop);
        appContainer.addEventListener('restart', this.restart);
        initAbsolute(appContainer, ['top', 'bottom', 'left', 'right']);
        setStyle(document.body, {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            margin: 0,
            overflowY: 'hidden',
            overflowX: 'hidden'
        });
        document.body.style.position = 'relative';

        return appContainer;
    }

    startGame(event){
        if (!this.gameManager.isPause) this.gameManager.setLevel(event.detail);
        this.gameManager.startGame();
    }

    stopGame(){
        this.gameManager.stopGame();

        if (this.gameManager.isGameOver) {
            if (this.gameManager.controller.points > this.score) {
                this.score = this.gameManager.controller.points;
                document.getElementById('highScore').innerText = this.score;
            }
            if (this.gameManager.controller.level > this.level) {
                this.level = this.gameManager.controller.level;
                document.getElementById('highLevel').innerText = this.level;
            }
            document.getElementById('playButton').style.display = 'none';
            document.getElementById('restartButton').style.display = 'block';
            document.getElementById('showMessage').style.display = 'block';
        }
    }

    restartGame(){
        this.appContainer.removeChild(this.gameManager.element);
        this.gameManager = new GameManager();
        this.appContainer.appendChild(this.gameManager.element);
    }
}