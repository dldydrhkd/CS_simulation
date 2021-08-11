const fs = require('fs');
const csvToJSON = require('./csvToJSON.js');

const select = (str) =>{
    let table_name = '';
    str = str.split(' ');
    table_name = str[2];
    let column_name = str[4];
    let value = str[6];
    let op = str[5];
    let type = (isNaN(Number(value))? 'String':'Numeric');
    if(op=='='){
        column_name += ':'+type;
        let res = fs.existsSync('./'+table_name+'.csv');
        if(res){
            const file_csv = fs.readFileSync('./'+table_name+'.csv');
            let string_csv = file_csv.toString();
            let [header,arr_json] = csvToJSON(string_csv);
            var cnt = 0;
            if(arr_json){
                arr_json.forEach((el)=>{
                    if(el[column_name]==value){
                        cnt++;
                        let s = '(';
                        header.forEach((head,idx) => {
                            s+=(idx!=header.length-1 ? el[head]+',' : el[head]);
                        })
                        s+=')';
                        console.log(s);
                    }
                })
            }
            console.log('SELECTED COUNT = '+cnt);
            console.log('\n');
        }
        else{
            //파일 없음
            console.log('파일이 존재 하지 않습니다.\n');
        }
    }
}

module.exports = select