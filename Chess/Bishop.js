import {piece, file} from './Piece.js';
import {check_range} from './utils.js';

let x = [1, 1, -1, -1];
let y = [1, -1, 1, -1];

export class bishop extends piece{
    possiblePositions(){
        let row = this.position.row;
        let col = this.position.col;
        let possiblePos = [];

        for (var i=0; i<4; i++){
            let new_row = row + x[i];
            let new_col = col + y[i];
            let tmpPos = [];
            while(check_range(new_row, new_col)){
                tmpPos.push(file[String(new_col)]+String(new_row+1));
                new_row = new_row + x[i];
                new_col = new_col+y[i];
            }
            possiblePos.push(tmpPos);
        }
        return possiblePos;
    }
}