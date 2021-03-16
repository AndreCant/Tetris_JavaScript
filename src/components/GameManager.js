import Tetris from './Tetris.js';
import GameBoard from './GameBoard.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';
import {SCALE, COLOR_1, COLOR_2} from '/src/constants/index.js';

export default class GameManager{
    
    constructor(){
        this.element = this.initScreen();
        this.times = this.resetTimes(1000);
        this.board = new GameBoard(this.screenWidth / SCALE, this.screenHeight / SCALE);
        this.tetris = new Tetris('#FFF');
        this.update();
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
        canvas.setAttribute('width', '256px');
        canvas.setAttribute('height', '512px');

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

    resetTimes(interval){
        return {
            lastTime: 0,
            lastDt: 0,
            interval: interval
        }
    }

    drop() {
        this.tetris.position.y++;
        if (this.board.collide(this.tetris)) this.merge();
        this.times.lastDt = 0;
    }

    merge(){
        this.tetris.position.y--;
        this.board.merge(this.tetris);
        this.tetris.position.y = 0;
    }

    update(timer = 0) {
        console.log('timer',timer);
        console.log(this.times.lastDt);
        console.log(this.times.interval);
        this.times.lastDt += (timer - this.times.lastTime);
        if (this.times.lastDt > this.times.interval) {
            this.drop();
        }

        this.setGameBoard();
        this.tetris.output(this.context);
        this.board.draw(this.context);
        this.times.lastTime = timer;

        requestAnimationFrame(() => {this.update()});
    }
}