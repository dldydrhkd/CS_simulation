import readline from 'readline';
import {board} from './Board.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('(프로그램 실행)');
console.log('체스 보드를 초기화했습니다.');
console.log('\n');
console.log('백 차례부터 시작합니다.')
const chess = new board();              // 체스 생성
chess.init();                           // 체스 초기화
chess.display();

rl.setPrompt('명령을 입력하세요> ');
rl.prompt();
rl.on('line', (line)=> {
    if(line.match(/[?][A-H][1-8]/)){
        console.log(chess.print_moves(line.slice(1)));
    }
    else if(line.match(/[A-H][1-8]->[A-H][1-8]/)){
        chess.move(line.substr(0,2), line.substr(4,6))
        chess.display();
    }
    else if(line == 'exit'){
        rl.close();
    }
    else{
        console.log("잘못된 형식입니다.");
    }
    rl.prompt();
})