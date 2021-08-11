const fs = require('fs');
const csvToJSON = require('./csvToJSON.js');

const report = (str) => {
    str = str.split(' ');
    let table_name = str[2];
    let res = fs.existsSync('./'+table_name+'.csv');
    if(res){
        const file_csv = fs.readFileSync('./'+table_name+'.csv');
        let string_csv = file_csv.toString();
        let [header,arr_json] = csvToJSON(string_csv);
        let columns = '컬럼 종류 : ';
        let total_records = arr_json.length;
        header.forEach((el,idx)=>{
            columns+= (idx!=header.length-1 ? el.split(':')[0]+',' : el.split(':')[0]);
        })
        let first_record = '(';
        header.forEach((el,idx) => {
            first_record+=(idx!=header.length-1 ? arr_json[0][el]+',':arr_json[0][el]);
        })
        first_record+=')'
        let last_record = ')';
        header.forEach((el,idx) => {
            last_record+=(idx!=header.length-1 ? arr_json[arr_json.length-1][el]+',':arr_json[arr_json.length-1][el]);
        })
        last_record+=')'
        console.log(columns);
        console.log(`전체 레코드 수 : ${total_records}개`);
        console.log(`최초 레코드 : ${first_record}`);
        console.log(`마지막 레코드 : ${last_record}`);
        console.log("\n");
    }
    else{
        //파일 없음
        console.log('파일이 존재 하지 않습니다.\n');
    }
}

module.exports = report;