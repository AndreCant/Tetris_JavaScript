import Tetris from './Tetris.js';
import { getRandomInt } from '/src/utils/index.js';
import { LEVEL_UPDATE, SOUND_LINES } from '/src/constants/index.js';

export default class GameController{

    constructor(){
        this.points = 0;
        this.lines = 0;
        this.currentTetris = null;
        this.board = null;
        this.sound = new Audio(`/src/resources/audio/${SOUND_LINES}`);
        this.genNextTetris();
    }

    get level(){
        return this._level;
    }
    set level(level){
        this._level = level;
    }

    get startLevel(){
        return this._startLevel;
    }
    set startLevel(level){
        this._startLevel = level;
    }

    generateTetris(){
        this.currentTetris = this.nextTetris;
        this.genNextTetris();
        return new Tetris(this.currentTetris);
    }

    genNextTetris(){
        this.nextTetris = getRandomInt();
    }

    increaseLevel(lines){
        if (lines) {
            this.sound.play();
            this.lines += lines;
            this.level = Number(this.startLevel) + Math.floor((this.lines + LEVEL_UPDATE) / LEVEL_UPDATE);
        }
    }
}