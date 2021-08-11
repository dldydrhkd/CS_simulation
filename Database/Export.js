const fs = require('fs');
const csvToJSON = require('./csvToJSON.js');
const jsonToCSV = require('./jsonToCSV.js');

const export_ = (str) => {
    str = str.split(' ');
    let new_file_name = str[2];
    let file_name = str[4];
    let condition_column = str[6];
    let condition_value = str[8];
    let op = str[7];
    let type = (isNaN(Number(condition_value))? 'String':'Numeric');
    condition_column+=':'+type;
    let res = fs.existsSync('./'+file_name+'.csv');
    if(res){
        if(op=='='){
            const file_csv = fs.readFileSync('./'+file_name+'.csv');
            let string_csv = file_csv.toString();
            let [header,arr_json] = csvToJSON(string_csv);
            var cnt = 0;
            let li = [];
            if(arr_json){
                arr_json.forEach((el,idx) => {
                    if(el[condition_column]==condition_value){
                        li.push(el);
                        cnt++;
                    }
                })
            }
            if(cnt){
                //파일 생성
                fs.writeFileSync('./'+new_file_name+'.csv', jsonToCSV(li));
                console.log('파일이 생성되었습니다.\n');
                console.log('EXPORT COUNT = '+cnt);
                li.forEach((el)=>{
                    console.log(Object.values(el));
                })
                console.log("\n");
            }
            else{
                console.log('조건에 맞는 데이터가 없습니다.\n');
            }

        }
    }
    else{
        //파일 없음
        console.log('파일이 존재 하지 않습니다.\n');
    }
}


module.exports = export_;