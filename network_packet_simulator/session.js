const uuid = require('uuid');
const trans = require('./transport.js');

//기본 설정으로 생성
async function sess (li){
    console.log(uuid.v4());
    li.push('27152f73-4853-4457-ad4f-0e23db34778b');
    trans(li);
}



module.exports = sess;