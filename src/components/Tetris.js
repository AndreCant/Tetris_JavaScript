import Matrix from './Matrix.js';
import { TETRIS } from '/src/constants/index.js';

export default class Tetris{
    constructor(tetrisType) {
        this.matrix = new Matrix(4, 4);
        this.matrix.setValue(1, 0, 1);
        this.matrix.setValue(1, 1, 0);
        this.matrix.setValue(1, 1, 1);
        this.matrix.setValue(1, 2, 1);
        // this.color = color;
        this.position = {
            x: 6,
            y: 2
        };
    }

    rotate(){
        this.matrix.transpose();
    }

    checkAfterRotate(colums){
        let exceded = false;
        this.matrix.iterate((value, x, y) => {
            let nextX = this.position.x + x;
            if (value !== 0) {
                if (nextX < 0) {
                    this.position.x++;
                } else if (nextX >= colums) {
                    this.position.x--;
                }
                exceded = true;
                return;
            }
        });
        return exceded;
    }

    output(context){
        context.fillStyle = this.color;
        this.matrix.iterate((value, x, y) => {
            if (value !== 0) {
                context.fillRect(x + this.position.x, y + this.position.y, 1, 1);
            }
        });
    }

    isEdge(colums){
        let exceded = false;
        this.matrix.iterate((value, x, y) => {
            let nextX = this.position.x + x;
            if (value !== 0 && (nextX < 0 || nextX >= colums)) {
                exceded = true;
                return;
            }
        });
        return exceded;
    }

    isBottom(rows){
        let bottom = false;
        this.matrix.iterate((value, x, y) => {
            if (value !== 0 && this.position.y + y >= rows) {
                bottom = true;
                return;
            }
        });
        return bottom;
    }

    getElements(){
        let cells = [];
        this.matrix.iterate((value, x, y) => {
            if (value !== 0) {
                cells.push({ value, x: x + this.position.x, y: y + this.position.y });
            }
        });
        return cells;
    }
}