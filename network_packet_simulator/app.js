const readline = require('readline');
const presentation = require('./pre.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

var li = [];
function app(n) {
    let ask = ['','From: ', 'To: ', 'Title: ', '\n입력 내용: '];
    rl.question(`${ask[n]}`, (answer) => {
        if(n!=4) li.push(answer + '\n');
        else{
            let s = '';
            for(var i=0; i<answer.length; i++){
                if(answer[i] == '\\' && i+1<answer.length && answer[i+1] == 't'){
                    s += '\t';
                    i++;
                }
                else if(answer[i] == '\\' && i+1<answer.length && answer[i+1] == 'n'){
                    s += '\n';
                    i++;
                }
                else if(answer[i] == '\\' && i+1<answer.length && answer[i+1] == 'r'){
                    s += '\r';
                    i++;
                }
                else{
                    s += answer[i];
                }
            }
            li.push(s);
        }
        if (n < 4) {
            app(n+1);
        } else {
            presentation(li);
            rl.close();
        }
    });
}
app(1);