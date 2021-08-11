const fs = require('fs');
const csvToJSON = require('./csvToJSON.js')

const insert = (str) =>{
    //parsing
    let table_name = '';
    var i = 12;
    while(str[i]!=' ' && i<str.length){
        table_name += str[i];
        i++;
    }
    i+=2;
    let columns = [];
    while(str[i]!=')' && i<str.length){
        while(str[i]==',' || str[i]==' ') i++;
        let column = '';
        while(str[i]!=',' && str[i]!=')'){
            column+=str[i];
            i++;
        }
        columns.push(column);
    }
    i+=10;
    let values = [];
    while(str[i]!=')' && i<str.length){
        while(i<str.length && str[i]==',' || str[i]==' ') i++;
        let value = '';
        while(i<str.length && str[i]!=',' && str[i]!=')'){
            value+=str[i];
            i++;
        }
        values.push(value);
    }
    if(columns.length != values.length){
        console.log(columns);
        console.log(values);
        console.log('column과 value의 개수가 맞지 않습니다.\n');
        return;
    } 

    //파일의 존재 유무
    let res = fs.existsSync('./'+table_name+'.csv');
    if(res){
        let csv_string = '\r\n';
        let file_csv = fs.readFileSync('./'+table_name+'.csv');
        let string_csv = file_csv.toString();
        let [header,arr_json] = csvToJSON(string_csv);
        if(header.length-1!=columns.length){
            console.log('table column의 개수와 맞지 않습니다.\n');
            return;
        }
        let idx = (arr_json.length) ? Number(arr_json[arr_json.length-1]['id:Numeric'])+1:1;
        csv_string+=idx+',';
        values.forEach((el,idx)=>{
            csv_string+= (idx!=values.length-1 ? el+',':el);
        })
        fs.writeFileSync('./'+table_name+'.csv', string_csv+csv_string);
        [header,arr_json] = csvToJSON(string_csv);
        file_csv = fs.readFileSync('./'+table_name+'.csv');
        string_csv = file_csv.toString();
        [header,arr_json] = csvToJSON(string_csv);
        if(arr_json){
            arr_json.forEach((el)=>{
                let s = '(';
                header.forEach((head,idx) => {
                    s+=(idx!=header.length-1 ? el[head]+',' : el[head]);
                })
                s+=')';
                console.log(s);
            })
        }
        console.log('Insertion 완료\n');
    }
    else{
        //파일 없음
        console.log('파일이 존재 하지 않습니다.\n');
    }
}

module.exports = insert;