import Matrix from './Matrix.js';
import { TETRIS, TETRIS_COLORS, BOARD_COLOR, GRID_DIMENSION } from '/src/constants/index.js';

export default class Tetris{
    constructor(tetrisType) {
        this.matrix = new Matrix(4, 4);
        this.tetrisType = tetrisType;

        TETRIS[tetrisType].forEach(({ x, y}) => {
            this.matrix.setValue(tetrisType, x, y);
        });

        this.color = TETRIS_COLORS[tetrisType];

        this.position = {
            x: (tetrisType == 2 || tetrisType == 4 || tetrisType == 7) ? 3 : 4,
            y: 0
        };
    }

    rotate(){
        if (this.tetrisType !== 3) {
            this.matrix.transpose();
            this.matrix.reverse();
        }
    }

    cancelRotation(){
        this.matrix.reverse();
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
        this.matrix.iterate((value, x, y) => {
            if (value !== 0) {
                context.fillStyle = this.color;
                context.fillRect(x + this.position.x, y + this.position.y, 1, 1);

                context.fillStyle = BOARD_COLOR;
                context.fillRect(x + this.position.x, y + this.position.y, GRID_DIMENSION, 1);
                context.fillRect(x + this.position.x, y + this.position.y, 1, GRID_DIMENSION);
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