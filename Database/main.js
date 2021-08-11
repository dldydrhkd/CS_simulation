const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.prompt();
rl.on('line', (line) => {
    if(line.toLowerCase().includes('create')){
        console.log('a');
    }
    rl.prompt();
}).on('close',()=>{
    process.exit();
})
