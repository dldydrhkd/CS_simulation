import {piece, file} from './Piece.js';

export class pawn extends piece{
    possiblePositions () {
        let row = this.position.row;
        let col = this.position.col;
        let possiblePos = [];
        if(this.color === 'black'){
            row++;
            if(row<8){
                possiblePos.push(file[String(col)]+String(row+1));
            }
        }
        else{
            row--;
            if(row >= 0){
                possiblePos.push(file[String(col)]+String(row+1));
            }
        }
        return [possiblePos];
    }
}