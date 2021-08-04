const fs = require('fs');

const rev_app = (str) => {
    if(!fs.existsSync('./mail')){
        fs.writeFileSync('./mail',str);
        console.log("저장완료");
    }
}

module.exports = rev_app;