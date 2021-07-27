import {piece, file} from './Piece.js';
import {check_range} from './utils.js';

let x = [1, 0, -1, 0];
let y = [0, 1, 0, -1];

export class rook extends piece{
    possiblePositions () {
        let row = this.position.row;
        let col = this.position.col;
        let possiblePos = [];
        
        for (let i = 0; i < 4; i++) {
            let new_row = row + x[i];
            let new_col = col + y[i];
            let tmpPos = [];
            while (check_range(new_row, new_col)) {
                tmpPos.push(file[String(new_col)]+String(new_row+1));
                new_row += x[i];
                new_col += y[i];
            }
            possiblePos.push(tmpPos);
        }

        return possiblePos;
    }
}