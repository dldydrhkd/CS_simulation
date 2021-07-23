import {lrucache} from './LRU.js';
import readline from 'readline';

// 인터페이스 객체를 만들자.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdout.write('키워드를 입력하세요> ');
rl.on('line', async function(line){
        await lrucache(line);
        process.stdout.write('키워드를 입력하세요> ');
})