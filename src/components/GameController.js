import Tetris from './Tetris.js';
import { getRandomInt } from '/src/utils/index.js';

export default class GameController{

    constructor(level){
        this.points = 0;
        this.lines = 0;
        this.level = level;
        this.currentTetris = 0;
        this.board = null;
        this.genNextTetris();
    }

    generateTetris(){
        this.currentTetris = this.nextTetris;
        this.genNextTetris();
        return new Tetris(this.nextTetris);
    }

    genNextTetris(){
        this.nextTetris = getRandomInt();
    }

    increaseLevel(lines){
        this.lines += lines;
        this.level = Math.floor((this.lines + 10) / 10);
    }


}