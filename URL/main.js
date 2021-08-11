const readline  = require('readline');
const check_url = require('./is_url.js');
const url = require('./Url.js');

const input = () => {
    let res;
    const rl = readline.createInterface({
        input: process.stdin, //or fileStream
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question('>', (line) => {
            res = line;
            rl.close();
            resolve(res);
        })
    })
};

async function main(){
    let link = await input();
    let new_url;
    if(check_url(link)){
        new_url = new url(link);
    }
    new_url.info();
    console.log('\n');
    console.log('Boost를 path에 추가')
    new_url.appendPathComponent('Boost');
    console.log('\n');
    console.log('Camp를 path에 추가')
    new_url.appendPathComponent('Camp');
    console.log('\n');
    console.log('마지막 path 제거');
    new_url.deletePathComponent();
}

main();