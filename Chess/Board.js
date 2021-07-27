import { pawn } from "./Pawn.js";
import { bishop } from "./Bishop.js";
import { knight } from "./Knight.js";
import { rook } from "./Rook.js";
import { queen } from "./Queen.js";
import { can_generate, get_color, is_possible_to_move} from "./utils.js";
import { rank,file } from "./Piece.js";

export class board{
    constructor(){
        this.cur_board = [['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.'],
                      ['.', '.', '.', '.', '.', '.', '.', '.']];
        this.pieces = {black:{pawn:0, bishop:0, rook:0, knight:0, queen:0},
                       white:{pawn:0, bishop:0, rook:0, knight:0, queen:0}};
        this.turn = false;   // false는 백
    }
    init(){
        // 백
        this.initPiece('pawn', 'A7');
        this.initPiece('pawn', 'B7');
        this.initPiece('pawn', 'C7');
        this.initPiece('pawn', 'D7');
        this.initPiece('pawn', 'E7');
        this.initPiece('pawn', 'F7');
        this.initPiece('pawn', 'G7');
        this.initPiece('pawn', 'H7');
        this.initPiece('bishop', 'C8');
        this.initPiece('bishop', 'F8');
        this.initPiece('rook', 'A8');
        this.initPiece('rook', 'H8');
        this.initPiece('knight', 'B8');
        this.initPiece('knight', 'G8');
        this.initPiece('queen', 'E8');

        // 흑
        this.initPiece('pawn', 'A2');
        this.initPiece('pawn', 'B2');
        this.initPiece('pawn', 'C2');
        this.initPiece('pawn', 'D2');
        this.initPiece('pawn', 'E2');
        this.initPiece('pawn', 'F2');
        this.initPiece('pawn', 'G2');
        this.initPiece('pawn', 'H2');
        this.initPiece('bishop', 'C1');
        this.initPiece('bishop', 'F1');  
        this.initPiece('rook', 'A1');
        this.initPiece('rook', 'H1');
        this.initPiece('knight', 'B1');
        this.initPiece('knight', 'G1');
        this.initPiece('queen', 'E1');
    }
    initPiece(type, position){
        let p;
        let color = get_color(position);
        if(!can_generate(type, position, this.cur_board, this.pieces, color)){
            console.log("해당 위치에 생성할 수 없습니다.");
            return;
        }
        if(type === 'pawn'){
            p = new pawn(type, position, color);
        }
        else if(type === 'bishop'){
            p = new bishop(type, position, color);
        }
        else if(type === 'rook'){
            p = new rook(type, position, color);
        }
        else if(type === 'knight'){
            p = new knight(type, position, color);
        }
        else if(type === 'queen'){
            p = new queen(type, position, color);
        }
        this.pieces[color][type]+=1;
        this.cur_board[p.position.row][p.position.col]=p;
    }
    display(){
        console.log('  A B C D E F G H');
        for (var i = 0; i<8; i++){
            let str = `${i + 1} `;
            for(var j=0; j<8; j++){
                if(this.cur_board[i][j]=='.') str+='. ';
                else if(this.cur_board[i][j].type == 'pawn'){
                    if(this.cur_board[i][j].color == 'black'){
                        str+= `\u265F `;
                    }
                    else{
                        str+= `\u2659 `;
                    }
                }
                else if(this.cur_board[i][j].type == 'bishop'){
                    if(this.cur_board[i][j].color == 'black'){
                        str+= `\u265D `;
                    }
                    else{
                        str+= `\u2657 `;
                    }
                }
                else if(this.cur_board[i][j].type == 'knight'){
                    if(this.cur_board[i][j].color == 'black'){
                        str+= `\u265E `;
                    }
                    else{
                        str+= `\u2658 `;
                    }
                }
                else if(this.cur_board[i][j].type == 'rook'){
                    if(this.cur_board[i][j].color == 'black'){
                        str+= `\u265C `;
                    }
                    else{
                        str+= `\u2656 `;
                    }
                }
                else if(this.cur_board[i][j].type == 'queen'){
                    if(this.cur_board[i][j].color == 'black'){
                        str+= `\u265B `;
                    }
                    else{
                        str+= `\u2655 `;
                    }
                }
            }
            console.log(str);
        }
        console.log('  A B C D E F G H\n');
    }
    getScore(){
        let black_score = 0;
        let white_score = 0;
        for (var i = 0; i<8; i++){
            for(var j=0; j<8; j++){
                if(this.cur_board[i][j]=='.') continue;
                else if(this.cur_board[i][j].type == 'pawn'){
                    if(this.cur_board[i][j].color == 'black'){
                        black_score += 1;
                    }
                    else{
                        white_score += 1;
                    }
                }
                else if(this.cur_board[i][j].type == 'bishop'){
                    if(this.cur_board[i][j].color == 'black'){
                        black_score += 3;
                    }
                    else{
                        white_score += 3;
                    }
                }
                else if(this.cur_board[i][j].type == 'knight'){
                    if(this.cur_board[i][j].color == 'black'){
                        black_score += 3;
                    }
                    else{
                        white_score += 3;
                    }
                }
                else if(this.cur_board[i][j].type == 'rook'){
                    if(this.cur_board[i][j].color == 'black'){
                        black_score += 5;
                    }
                    else{
                        white_score += 5;
                    }
                }
                else if(this.cur_board[i][j].type == 'queen'){
                    if(this.cur_board[i][j].color == 'black'){
                        black_score += 9;
                    }
                    else{
                        white_score += 9;
                    }
                }
            }
        }
        console.log(`\n흑 점수: ${black_score}, 백 점수: ${white_score}`);
    }
    move(from, to){
        let tmpPiece = this.cur_board[rank[from[1]]][file[from[0]]];
        let tmpTurn = false;
        if(tmpPiece.color=='black') tmpTurn=true;
        if(tmpPiece == '.'){
            console.log('\n해당 위치는 비어 있습니다.');
            return false;
        }
        if(this.turn!=tmpTurn){
            if(this.turn) console.log("\n흑 차례입니다. 흑 말을 이용해주세요.");
            else console.log("\n백 차례입니다. 백 말을 이용해주세요.");
            return false;
        }
        if(tmpPiece != '.' && this.turn==tmpTurn){
            let tmpArr = is_possible_to_move(tmpPiece.possiblePositions(), this.cur_board, tmpPiece.color, tmpPiece.type)
            if(tmpArr.includes(to)){
                if(this.cur_board[rank[to[1]]][file[to[0]]]=='.'){
                    this.cur_board[rank[from[1]]][file[from[0]]]='.';
                    tmpPiece.position.row = rank[to[1]];
                    tmpPiece.position.col = file[to[0]];
                    this.cur_board[rank[to[1]]][file[to[0]]]=tmpPiece;
                }
                else{
                    this.cur_board[rank[from[1]]][file[from[0]]]='.';
                    tmpPiece.position.row = rank[to[1]];
                    tmpPiece.position.col = file[to[0]];
                    this.cur_board[rank[to[1]]][file[to[0]]]=tmpPiece;
                    this.getScore();
                    console.log('\n');
                }
            }
            else{
                console.log("\n이동이 불가능합니다.");
                return false;
            }
            this.turn = !this.turn;
            if(this.turn) console.log("\n이제 흑 차례입니다.");
            else{
                console.log("\n이제 백 차례입니다.");
            }
            return true;
        }
        return false;
    }
    print_moves(cur){
        let tmpPiece = this.cur_board[rank[cur[1]]][file[cur[0]]];
        if(tmpPiece != '.'){
            let tmpArr = is_possible_to_move(tmpPiece.possiblePositions(), this.cur_board, tmpPiece.color, tmpPiece.type);
            if(tmpArr.length==0){
                return "없음";
            }
            return tmpArr;
        }
        else{
            return "없음";
        }
    }
}