const fs = require('fs');
const csvToJSON = require('./csvToJSON.js');
const jsonToCSV = require('./jsonToCSV.js');

const update = (str) =>{
    let table_name = '';
    str = str.split(' ');
    table_name = str[1];
    let column_name = str[3];
    let value = str[5];
    let op = str[8];
    let type = (isNaN(Number(value))? 'String':'Numeric');
    if(op=='='){
        let condition_column = str[7]
        let condition_value = str[9]
        let condition_type = (isNaN(Number(condition_value))? 'String':'Numeric');
        condition_column+=':'+condition_type;
        column_name += ':'+type;
        let res = fs.existsSync('./'+table_name+'.csv');
        var cnt =0;
        if(res){
            const file_csv = fs.readFileSync('./'+table_name+'.csv');
            let string_csv = file_csv.toString();
            let [header,arr_json] = csvToJSON(string_csv);
            if(arr_json.length){
                arr_json.forEach((el)=>{
                    if(el[condition_column]==condition_value){
                        cnt++;
                        el[column_name]=value;
                    }
                })
                fs.writeFileSync('./'+table_name+'.csv', jsonToCSV(arr_json));
                if(cnt){
                    arr_json.forEach((el)=>{
                        let s = '(';
                        header.forEach((head,idx) => {
                            s+=(idx!=header.length-1 ? el[head]+',' : el[head]);
                        })
                        s+=')';
                        console.log(s);
                    })
                    console.log('Update 완료\n');
                }
                else{
                    console.log('조건에 맞는 레코드가 없습니다.\n');
                }
            }
            else{
                console.log('조건에 맞는 레코드가 없습니다.\n');
            }
        }
        else{
            //파일 없음
            console.log('파일이 존재 하지 않습니다.\n');
        }
    }
}

module.exports = update;