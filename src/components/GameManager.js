import GameBoard from './GameBoard.js';
import GameController from './GameController.js';
import Tetris from './Tetris.js';
import {initAbsolute, setStyle} from '/src/utils/index.js';
import {BOARD_COLOR, GRID_COLOR, DEFAULT_DIFFICULTY, RESOLUTION, GRID_DIMENSION, SOUNDTRACK, SOUND_GAME_OVER, SOUND_BOTTOM} from '/src/constants/index.js';

export default class GameManager{
    
    constructor(){
        this.inputListener = event => this.inputController(event);

        this.element = this.initScreen();
        this.controller = new GameController();
        this.board = new GameBoard(this.screenWidth / this.scale, this.screenHeight / this.scale, this.controller);
        this.tetris = this.controller.generateTetris();
        this.times = this.resetTimes(DEFAULT_DIFFICULTY);
        this.sounds = this.loadSounds();
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

    get scale(){
        return this._scale;
    }
    set scale(scale){
        this._scale = scale;
    }

    get isPause(){
        return this._isPause;
    }
    set isPause(isPause){
        this._isPause = isPause;
    }

    initScreen(){
        const article = this.createArticle();
        const leftContainer = this.createLeftContainer();
        const centerContainer = this.createCenterContainer();
        const rightContainer = this.createRightContainer();

        article.appendChild(leftContainer);
        article.appendChild(centerContainer);
        article.appendChild(rightContainer);

        return article;
    }

    createArticle(){
        const article = document.createElement('article');
        article.setAttribute('id', 'main-content');
    
        initAbsolute(article, ['top', 'bottom', 'right']);
        article.style.left = '20%';
    
        setStyle(article, {
            margin: '2%',
            textAlign: 'center',
            display: 'inline-grid',
            gridTemplateColumns: '33% 34% 33%',
            // backgroundImage: `url("/src/resources/${BACKGROUND_IMAGE}")`,
            gridColumnStart: '1',
            gridColumnEnd: '3'
        });

        return article;
    }

    createLeftContainer(){
        const leftContainer = this.createContainer('', '1');
        const pointsContainer = this.createContentContainer('red', '1', 'POINTS', 'showPoints');
        const levelsContainer = this.createContentContainer('orange', '2', 'LEVEL', 'showLevel');

        leftContainer.appendChild(pointsContainer);
        leftContainer.appendChild(levelsContainer);

        return leftContainer;
    }

    createCenterContainer(){
        const centerContainer = this.createContainer('', '2');
        const canvas = this.createCanvas();

        centerContainer.appendChild(canvas);

        return centerContainer;
    }

    createRightContainer(){
        const rightContainer = this.createContainer('', '3');
        const nextTetrisContainer = this.createContentContainer('yellow', '1', 'NEXT', 'showNext');
        const linesContainer = this.createContentContainer('lime', '2', 'LINES', 'showLines');

        rightContainer.appendChild(nextTetrisContainer);
        rightContainer.appendChild(linesContainer);

        return rightContainer;
    }

    createCanvas(){
        const len = window.outerHeight == 3 ? 1 : 2; 
        const res = Number(window.outerHeight.toString().substring(0,len)) - 2;
        this.scale = RESOLUTION[res].scale;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'screen');
        canvas.setAttribute('width', `${RESOLUTION[res].width}px`);
        canvas.setAttribute('height', `${RESOLUTION[res].height}px`);

        initAbsolute(canvas, ['bottom', 'left', 'right']);
        setStyle(canvas, {
            display: 'block',
            margin: '0 auto',
            borderRight: `1.5px solid ${GRID_COLOR}`,
            borderBottom: `1.5px solid ${GRID_COLOR}`,
        });

        this.initContext(canvas);

        return canvas;
    }

    createContainer(color, column){
        const div = document.createElement('div');
        setStyle(div, {
            gridColumn: column,
            backgroundColor: color,
            display: 'grid',
            gridTemplateRows: '50% 50%',
        });

        return div;
    }

    createContentContainer(color, row, title, id){

        const div = document.createElement('div');
        div.innerText = title;
        setStyle(div, {
            width: '60%',
            height: '60%',
            gridRow: row,
            backgroundColor: 'grey',
            margin: '18%',
            color: color,
            fontStyle: 'Courier',
            fontSize: '250%',
            borderRadius: '30% 30% 30% 30% / 25% 25% 25% 25%',
            border: '5px solid black',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        });

        const div2 = document.createElement('div');
        setStyle(div2, {
            width: '60%',
            backgroundColor: '#4f4f4f',
            margin: '20%',
            color: 'white',
            fontStyle: 'Courier',
            fontSize: '100%',
            borderRadius: '10% 10% 10% 10% / 25% 25% 25% 25%',
            border: '3px solid black',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        });
        
        if (id !== 'showNext') {
            div2.setAttribute('id', id);
            div2.innerText = 0;  
        }else{
            const canvas = document.createElement('canvas');
            canvas.setAttribute('id', id);
            canvas.setAttribute('width', '100%');
            canvas.setAttribute('height', '100%');
            canvas.addEventListener('nextTetris', this.showNextTetris);
            const context = canvas.getContext('2d');

            setStyle(canvas, {
                display: 'block',
                margin: '0 auto',
                padding: '10%'
            });

            context.scale(canvas.width / 6, canvas.height / 6);
            this.setGameBoard(context, 6, 6);

            div2.appendChild(canvas);
        }

        div.appendChild(div2);

        return div; 
    }

    initContext(screen){
        const context = screen.getContext('2d');
        context.scale(this.scale, this.scale);
        
        this.screenWidth = screen.width;
        this.screenHeight = screen.height;
        this.context = context;
        this.setGameBoard(this.context, this.screenWidth/this.scale, this.screenHeight/this.scale);
    }

    setGameBoard(context, rows, cols){
        for (let x = 0; x < rows ; x++) {
            for (let y = 0; y < cols; y++) {
                context.fillStyle = BOARD_COLOR;
                context.fillRect(x, y, 1, 1);

                context.fillStyle = GRID_COLOR;
                context.fillRect(x, y, GRID_DIMENSION, 1);
                context.fillRect(x, y, 1, GRID_DIMENSION);
            }
        }
    }

    setLevel(level){
        this.controller.startLevel = level;
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
            this.sounds.bottom.play();
            this.board.merge(this.tetris);
            this.tetris = this.startNewTetris();
            this.setDifficulty();
            this.updateNextTetris();
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
    
            this.setGameBoard(this.context, this.screenWidth/this.scale, this.screenHeight/this.scale);
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
        if (!this.isPause) {
            let direction = 0;
            switch (key) {
                case 'Escape': this.stopGame();
                    break;
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
                    if (this.tetris.isEdge(this.screenWidth / this.scale)) this.tetris.checkAfterRotate(this.screenWidth / this.scale);
                    if (this.board.collide(this.tetris)) this.merge();
                    break;
                default:
                    break;
            }
            this.tetris.position.x += direction;
        
            if (direction != 0 && (this.tetris.isEdge(this.screenWidth / this.scale) || this.board.elementCollide(this.tetris))) {
                this.tetris.position.x -= direction;
            }
        }else{
            if (key === 'Escape') {
                this.startGame();
            }
        }
    }

    startGame(){
        window.addEventListener('keydown', this.inputListener);
        this.isPause = false;
        this.removeLevelButton();
        this.setDifficulty();
        this.updateLevel();
        this.updateNextTetris();
        this.update();
        this.sounds.soundtrack.play();
    }

    stopGame(){
        this.isPause = true;
        this.sounds.soundtrack.pause();
        this.stopGraphicRefresh();
    }

    startNewTetris(){
        this.board.deleteRows();
        return this.controller.generateTetris();
    }

    gameOver(){
        console.log('GAME OVER');
        this.isGameOver = true;
        this.sounds.soundtrack.pause();
        this.sounds.gameOver.play();
        document.getElementById('main').dispatchEvent(new CustomEvent('stop'));
    }

    updateInfo(){
        this.updateLevel();
        this.updateLines();
        this.updatePoints();
    }

    updateLevel(){
        document.getElementById('showLevel').innerText = this.controller.level;
    }

    updatePoints(){
        document.getElementById('showPoints').innerText = this.controller.points;
    }

    updateLines(){
        document.getElementById('showLines').innerText = this.controller.lines;
    }

    updateNextTetris(){
        const next = this.controller.nextTetris;
        const nextTetris = new Tetris(next);
        const context = document.getElementById('showNext').getContext('2d');

        this.setGameBoard(context, 6, 6);

        nextTetris.position.x = (next == 2 || next == 4 || next == 7) ? 1 : 2;
        nextTetris.position.y = 2;
        nextTetris.output(context);
    }

    removeLevelButton(){
        document.getElementById('levelButton').style.display = 'none';
    }

    loadSounds(){
        const soundtrack = new Audio(`/src/resources/audio/${SOUNDTRACK}`);
        const gameOver = new Audio(`/src/resources/audio/${SOUND_GAME_OVER}`);
        const bottom = new Audio(`/src/resources/audio/${SOUND_BOTTOM}`);

        soundtrack.loop = true;
        soundtrack.volume = 0.15;

        return {soundtrack, gameOver, bottom};
    }
}