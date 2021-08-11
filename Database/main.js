const readline = require('readline');
const create = require('./Create.js');
const insert = require('./Insert.js');
const delete_ = require('./Delete.js');
const update = require('./Update.js');
const select = require('./Select.js');
const drop = require('./Drop.js');
const export_ = require('./Export.js');
const report = require('./Report.js');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.prompt();
rl.on('line', (line) => {
    if(line.toLowerCase().match(/create table [\w]+ \([\w ,]+\)/)){
        create(line);
    }
    else if(line.toLowerCase().match(/insert into \w+ \([\w, ]+\) values \([\w, "]+\)/)){
        insert(line);
    }
    else if(line.toLowerCase().match(/delete from \w+ where [\w]+ [=|<|>] [\w "]+/)){
        delete_(line);
    }
    else if(line.toLowerCase().match(/update \w+ set \w+ = [\w "]+ where \w+ [=|<|>] [\w "]+/)){
        update(line);
    }
    else if(line.toLowerCase().match(/select from \w+ where \w+ [=|<|>] [\w "]+/)){
        select(line);
    }
    else if(line.toLowerCase().match(/drop table \w+/)){
        drop(line);
    }
    else if(line.toLowerCase().match(/report table \w+/)){
        report(line);
    }
    else if(line.toLowerCase().match(/export to \w+ from \w+ where \w+ [=|<|>] [\w "]+/)){
        export_(line);
    }
    else{
        console.log('입력 형식이 잘못되었습니다.\n');
    }
    rl.prompt();
}).on('close',()=>{
    process.exit();
})
