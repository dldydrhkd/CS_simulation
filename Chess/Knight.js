import {piece, file} from './Piece.js';
import {check_range} from './utils.js';

let x = [0, 0, 1, 1, -1, -1, 0, 0];
let y = [1, 1, 0, 0, 0, 0, -1, -1];
let dx = [-1, 1, 1, 1, -1, -1, 1, -1];
let dy = [1, 1, -1, 1, -1, 1, -1, -1];

export class knight extends piece{
    possiblePositions () {
        let row = this.position.row;
        let col = this.position.col;
        let possiblePos = [];
        
        for (let i = 0; i < 8; i++) {
            let new_row = row + x[i];
            let new_col = col + y[i];
            let nn_row = new_row + dx[i];
            let nn_col = new_col + dy[i];
            let tmpPos = [];
            if(check_range(new_row, new_col) && check_range(nn_row, nn_col)){
                tmpPos.push([file[String(new_col)]+String(new_row+1),file[String(nn_col)]+String(nn_row+1)]);
            }
            possiblePos.push(tmpPos);
        }

        return possiblePos;
    }
}