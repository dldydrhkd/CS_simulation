const fs = require('fs');
const csvToJSON = require('./csvToJSON.js');
const jsonToCSV = require('./jsonToCSV.js');

const delete_ = (str) =>{
    var i=12;
    let table_name = '';
    while(i<str.length && str[i]!=' '){
        table_name += str[i];
        i++;
    }
    i+=7;
    let condition = '';
    while(i<str.length){
        condition+=str[i];
        i++;
    }
    if(condition.includes('=')){
        let column = condition.split('=')[0].trim();
        let value = condition.split('=')[1].trim();
        let type = (isNaN(Number(value))? 'String':'Numeric');
        column = column+':'+type;
        let res = fs.existsSync('./'+table_name+'.csv');
        if(res){
            const file_csv = fs.readFileSync('./'+table_name+'.csv');
            let string_csv = file_csv.toString();
            let [header,arr_json] = csvToJSON(string_csv);
            let tmp = arr_json.filter(el =>{
                if(el[column]==value){
                    let s = '(';
                    header.forEach((head,idx) => {
                        s+=(idx!=header.length-1 ? el[head]+',' : el[head]);
                    })
                    s+=')';
                    console.log(s);
                }
                else{
                    return el;
                }
            })
            if(tmp){
                fs.writeFileSync('./'+table_name+'.csv', header.join(','));
            }else{
                fs.writeFileSync('./'+table_name+'.csv', jsonToCSV(tmp));
            }
            if(tmp.length==arr_json.length){
                console.log('조건에 맞는 데이터가 존재하지 않습니다.\n');
            }
            else{
                console.log('Deletion 완료\n');
            }
        }
        else{
            //파일 없음
            console.log('파일이 존재 하지 않습니다.\n');
        }
    }
    
}

module.exports = delete_;