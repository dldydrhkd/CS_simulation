const fs = require('fs');

const drop = (str) => {
    //parsing
    let table_name = str.split(' ')[2];
    let res = fs.existsSync('./'+table_name+'.csv');
    if(res){
        fs.unlinkSync('./'+table_name+'.csv', function(err){
            if( err ) throw err;
            console.log('테이블을 삭제 하였습니다.\n');
        });
    }
    else{
        //파일 생성
        console.log('테이블이 존재 하지 않습니다.\n');
    }
}

module.exports = drop;