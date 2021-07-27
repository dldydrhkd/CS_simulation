import { file, rank } from "./Piece.js";

export const can_generate = function(type, pos, board, pieces, color){
    if(type === 'pawn'){
        if(pos[1] === '2' || pos[1] === '7'){
            if(board[rank[pos[1]]][file[pos[0]]]=='.'){
                if(color == 'black' && pieces[color][type]<8){
                    return true;
                }
                else if(color == 'white' && pieces[color][type]<8){
                    return true;
                }
            }
        }
    }
    else if(type === 'bishop'){
        if(pos === 'C1' || pos === 'F1' || pos === 'C8' || pos === 'F8'){
            if(board[rank[pos[1]]][file[pos[0]]]=='.'){
                if(color == 'black' && pieces[color][type]<2){
                    return true;
                }
                else if(color == 'white' && pieces[color][type]<2){
                    return true;
                }
            }
        }
    }
    else if(type === 'rook'){
        if(pos === 'A1' || pos === 'H1' || pos === 'A8' || pos === 'H8'){
            if(board[rank[pos[1]]][file[pos[0]]]=='.'){
                if(color == 'black' && pieces[color][type]<2){
                    return true;
                }
                else if(color == 'white' && pieces[color][type]<2){
                    return true;
                }
            }
        }
    }
    else if(type === 'knight'){
        if(pos === 'B1' || pos === 'G1' || pos === 'B8' || pos === 'G8'){
            if(board[rank[pos[1]]][file[pos[0]]]=='.'){
                if(color == 'black' && pieces[color][type]<2){
                    return true;
                }
                else if(color == 'white' && pieces[color][type]<2){
                    return true;
                }
            }
        }
    }
    else if(type === 'queen'){
        if(pos === 'E1' || pos === 'E8'){
            if(board[rank[pos[1]]][file[pos[0]]]=='.'){
                if(color == 'black' && pieces[color][type]<1){
                    return true;
                }
                else if(color == 'white' && pieces[color][type]<1){
                    return true;
                }
            }
        }
    }
    return false;
}

export const get_color = function(position){
    if(position[1]=='7' || position[1]=='8'){
        return "white";
    }
    else{
        return "black";
    }
}

export const check_range = function(x, y){
    if(x>=0 && x<8 && y>=0 && y<8){
        return true;
    }
    return false;
}

export const is_possible_to_move = function(possiblePos, board, color, type){
    let tmpArr = [];
    if(type=='knight'){
        for(var i=0; i<possiblePos.length; i++){
            for(var j=0; j<possiblePos[i].length; j++){
                let row1 = rank[possiblePos[i][j][0][1]];
                let col1 = file[possiblePos[i][j][0][0]];
                let row2 = rank[possiblePos[i][j][1][1]];
                let col2 = file[possiblePos[i][j][1][0]];
                if(board[row1][col1] == '.' && board[row2][col2] == '.') tmpArr.push(file[String(col2)]+String(row2+1));
                else if(board[row1][col1] == '.' && board[row2][col2].color==color){
                    break;
                }
                else if(board[row1][col1] == '.' && board[row2][col2].color != color){
                    tmpArr.push(file[String(col2)]+String(row2+1));
                    break;
                }
                else if(board[row1][col1].color==color){
                    break;
                }
            }
        }
    }
    else{
        for(var i=0; i<possiblePos.length; i++){
            for(var j=0; j<possiblePos[i].length; j++){
                let row = rank[possiblePos[i][j][1]];
                let col = file[possiblePos[i][j][0]];
                if(board[row][col] == '.') tmpArr.push(file[String(col)]+String(row+1));
                else if(board[row][col].color==color){
                    break;
                }
                else if(board[row][col].color != color){
                    tmpArr.push(file[String(col)]+String(row+1));
                    break;
                }
            }
        }
    }
    
    return tmpArr;
}