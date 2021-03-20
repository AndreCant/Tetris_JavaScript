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
        if (!this._level) {
            this._level = level;
        }else{
            this._level = level;
            this.predLevel = level;
        }
    }

    get predLevel(){
        return this._predLevel;
    }
    set predLevel(level){
        this._predLevel = level;
    }

    generateTetris(){
        console.log('qui', this.controller.level);
        this.currentTetris = this.nextTetris;
        this.genNextTetris();
        return new Tetris(this.nextTetris);
    }

    genNextTetris(){
        this.nextTetris = getRandomInt();
    }

    increaseLevel(lines){
        if (lines) {
            this.lines += lines;
            this.level = Math.floor((this.lines + LEVEL_UPDATE) / LEVEL_UPDATE);
        }
    }
}