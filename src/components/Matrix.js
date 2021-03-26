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
    }

    reverse(){
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

    deleteRows(){
        let rows = [];
        const len = this.elements.length;
        this.elements.forEach((row, index) => {  
            if (row.every(value => value !== 0)) {
                rows.push(index);
            }
        });

        rows.forEach(index => {
            this.elements.splice(index, 1);
        });

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            this.elements.unshift(new Array(this.elements[0].length).fill(0));
        }
        
        return rows.length;
    }
}