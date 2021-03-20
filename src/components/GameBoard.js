import Matrix from './Matrix.js';
import { TETRIS_COLORS } from '/src/constants/index.js';



export default class Board{
    constructor(width, height, controller) {
        this.width = width;
        this.height = height;
        this.controller = controller;
        this.elements = new Matrix(width, height);
    }

    collide(element){
        if (element.isBottom(this.height)) return true;
        if (this.elementCollide(element)) return true;
        return false;
    }

    elementCollide(element){
        let collide = false;
        let cells = element.getElements();
        cells.forEach(({value, x, y}) => {
            if (this.elements.getValue(x, y) !== 0) {
                collide = true;
            }
        });
        return collide;
    }

    merge(element){
        let cells = element.getElements();

        cells.forEach(elem => {
            const { value, x, y } = elem;
            this.elements.setValue(value, x, y);
        });
    }

    draw(context){
        this.elements.iterate((value, x, y) => {
            if (value !== 0) {
                context.fillStyle = TETRIS_COLORS[value];
                context.fillRect(x, y, 1, 1);
            }
        });
    }

    deleteRows(){
        const lines = this.elements.deleteRows();

        this.controller.points += (lines * this.controller.level * 100);
        this.controller.increaseLevel(lines);
    }
}