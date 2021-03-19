import GameBoard from './GameBoard.js';
import GameController from './GameController.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';
import {SCALE, COLOR_1, COLOR_2, DEFAULT_DIFFICULTY} from '/src/constants/index.js';

export default class GameManager{
    
    constructor(){
        this.inputListener = event => this.inputController(event);

        this.element = this.initScreen();
        this.controller = new GameController();
        this.board = new GameBoard(this.screenWidth / SCALE, this.screenHeight / SCALE, this.controller);
        this.tetris = this.controller.generateTetris();
        this.times = this.resetTimes(DEFAULT_DIFFICULTY);
    }
    
    get context(){
        return this._context;
    }
    set context(context){
        this._context = context;
    }

    get screenWidth(){
        return this._screenWidth;
    }
    set screenWidth(width){
        this._screenWidth = width;
    }

    get screenHeight(){
        return this._screenHeight;
    }
    set screenHeight(height){
        this._screenHeight = height;
    }

    get refreshId(){
        return this._refreshId;
    }
    set refreshId(refreshId){
        this._refreshId = refreshId;
    }

    get isGameOver(){
        return this._isGameOver;
    }
    set isGameOver(isGameOver){
        this._isGameOver = isGameOver;
    }

    initScreen(){
        const article = this.createArticle();
        const canvas = this.createCanvas();

        article.appendChild(canvas);

        return article;
    }

    createArticle(){
        const article = document.createElement('article');
        article.setAttribute('id', 'main-content');
    
        initAbsolute(article, ['top', 'bottom', 'right']);
        article.style.left = '30%';
    
        setStyle(article, {
            border: '3px solid black'
        });

        return article;
    }

    createCanvas(){
        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'screen');
        canvas.setAttribute('width', '400px');
        canvas.setAttribute('height', '800px');
        // canvas.setAttribute('width', '100%');
        // canvas.setAttribute('height', '200vw');

        initAbsolute(canvas, ['top', 'bottom', 'left']);
        setStyle(canvas, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });

        this.initContext(canvas);

        return canvas;
    }

    initContext(screen){
        const context = screen.getContext('2d');
        context.scale(SCALE, SCALE);
        
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.context = context;
        this.setGameBoard();
    }

    setGameBoard(){
        for (let index = 0; index < this.screenWidth / SCALE ; index++) {
            this.context.fillStyle = index % 2 == 0 ? COLOR_1 : COLOR_2;
            this.context.fillRect(index, 0, 1, this.screenHeight / SCALE);
        }
    }

    setLevel(level){
        this.controller.level = level;
    }

    setDifficulty(){
        this.times.interval = DEFAULT_DIFFICULTY / this.controller.level;
    }

    resetTimes(interval){
        return {
            lastTime: 0,
            lastDt: 0,
            interval: interval
        }
    }

    drop() {
        this.tetris.position.y++;
        this.controller.points++;
        if (this.board.collide(this.tetris)) this.merge();
        this.times.lastDt = 0;

        this.updateInfo();
    }

    merge(){
        this.tetris.position.y--;
        if (this.tetris.position.y) {
            this.board.merge(this.tetris);
            this.tetris = this.startNewTetris();
            this.setDifficulty();
        }else{
            this.gameOver();
        }
    }

    update(time = 0) {
        if (!this.isGameOver) {
            this.times.lastDt += (time - this.times.lastTime);
            if (this.times.lastDt > this.times.interval) {
                this.drop();
            }
    
            this.setGameBoard();
            this.tetris.output(this.context);
            this.board.draw(this.context);
            this.times.lastTime = time;
    
            this.startGraphicRefresh();
        }
    }

    startGraphicRefresh(){
        this.refreshId = window.requestAnimationFrame(time => this.update(time));
    }

    stopGraphicRefresh(){
        if (this.refreshId) {
            window.cancelAnimationFrame(this.refreshId);
            this.refreshId = undefined;
         }
    }

    inputController(event){
        const { key } = event;
        let direction = 0;
    
        switch (key) {
            case 'ArrowLeft':
                direction = -1;
                break;
            case 'ArrowRight':
                direction = 1;
                break;
            case 'ArrowDown':
                this.drop();
                break;
            case 'ArrowUp':
                this.tetris.rotate();
                if (this.tetris.isEdge(this.screenWidth / SCALE)) this.tetris.checkAfterRotate(this.screenWidth / SCALE);
                if (this.board.collide(this.tetris)) this.merge();
                break;
            default:
                break;
        }
        this.tetris.position.x += direction;
    
        if (direction != 0 && (this.tetris.isEdge(this.screenWidth / SCALE) || this.board.elementCollide(this.tetris))) {
            this.tetris.position.x -= direction;
        }
    }

    startGame(){
        window.addEventListener('keydown', this.inputListener);

        this.setDifficulty();
        this.updateLevel();
        this.update();
    }

    stopGame(){
        window.removeEventListener('keydown', this.inputListener);
        this.stopGraphicRefresh();
    }

    startNewTetris(){
        this.board.deleteRows();
        return this.controller.generateTetris();
    }

    gameOver(){
        console.log('GAME OVER');
        this.stopGame();
        this.isGameOver = true;
        document.getElementById('main').dispatchEvent(new CustomEvent('stop'));
    }

    updateInfo(){
        this.updateLevel();
        this.updateLines();
        this.updatePoints();
    }

    updateLevel(){
        document.getElementById('showLevel').dispatchEvent(new CustomEvent('setlevel', {detail: this.controller.level}));
    }

    updatePoints(){
        document.getElementById('showPoints').dispatchEvent(new CustomEvent('setpoints', {detail: this.controller.points}));
    }

    updateLines(){
        document.getElementById('showLines').dispatchEvent(new CustomEvent('setlines', {detail: this.controller.lines}));
    }
}