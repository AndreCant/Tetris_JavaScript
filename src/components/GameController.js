import Tetris from './Tetris.js';
import { getRandomInt } from '/src/utils/index.js';

export default class GameController{

    constructor(){
        this.points = 0;
        this.nextTetris = getRandomInt();
        this.lines = 0;
        this.currTetris = 0;
        this.board = null;

    }

    generateTetris(){
        this.currentTetris = new Tetris(this.nextTetris);
    }
}