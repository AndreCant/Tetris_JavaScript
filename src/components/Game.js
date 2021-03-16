import Sidebar from './Sidebar.js';
import GameManager from './GameManager.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';

export default class Tetris {
    constructor(){
        this.initGame();
    }

    initGame(){
        const appContainer = this.createContainer();
        const sidebar = new Sidebar();
        const gameManager = new GameManager();

        appContainer.appendChild(sidebar.element);
        appContainer.appendChild(gameManager.element);

        document.body.appendChild(appContainer);
    }

    createContainer(){
        const appContainer = document.createElement('main');
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
}