export default class Matrix{

    constructor(width, height){
        this.elements = [];
        this.reset(width, height);

    }

    transpose(){
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < i; j++) {
                let tmp = this.getValue(i,j);
                this.setValue(this.getValue(j, i), i, j);
                this.setValue(tmp, j, i);
            }
        }
        for (let i = 0; i < 4; i++) {
            this.elements[i].reverse();
        }
    }

    setValue(value, x, y){
        this.elements[y][x] = value;
    }

    getValue(x, y){
        return this.elements[y][x];
    }

    reset(width, height){
        while(height-- > 0){
            console.log('columns', width);
            this.elements.push(new Array(width).fill(0));
        }
    }

    iterate(callback){
        this.elements.forEach((row, y) => {
            row.forEach((value, x) => {
                callback(value, x, y);
            });
        });
    }

    print(){
        console.table(this.elements);
    }
}