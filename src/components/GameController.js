import Tetris from './Tetris.js';
import { getRandomInt } from '/src/utils/index.js';
import { LEVEL_UPDATE } from '/src/constants/index.js';

export default class GameController{

    constructor(){
        this.points = 0;
        this.lines = 0;
        this.currentTetris = null;
        this.board = null;
        this.genNextTetris();
    }

    get level(){
        return this._level;
    }
    set level(level){
        this._level = level;
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
        this.level = Math.floor((this.lines + LEVEL_UPDATE) / LEVEL_UPDATE);
    }
}