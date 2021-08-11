const fs = require('fs');

const create = (str) => {
    //parsing
    let table_name = '';
    let arg = [];
    arg.push('id:Numeric');
    var i=13;
    while(str[i]!=' ' && i<str.length){
        table_name +=str[i];
        i++;
    }
    i+=2;
    while(str[i]!=')' && i<str.length){
        while(i<str.length && str[i]==' ' || str[i]==',') i++;
        let column_name = '';
        while(i<str.length && str[i]!=' '){
            column_name += str[i];
            i++;
        }
        i++;
        let data_type = '';
        while(i<str.length && str[i]!=',' && str[i]!=')'){
            data_type += str[i];
            i++;
        }
        if(column_name=='id'){
            console.log('id 컬럼은 추가할 수 없습니다.\n');
            return;
        } 
        if(!column_name || !data_type){
            console.log('입력 형식이 잘못되었습니다.\n');
            return;
        }
        arg.push(`${column_name}:${data_type}`);
    }
    if(arg.length>9){
        console.log('컬럼이 너무 많습니다. 최대 9개까지만 입력해주세요.\n');
        return;
    }
    
    //파일 존재 유무
    let res = fs.existsSync('./'+table_name+'.csv');
    if(res){
        console.log('파일이 이미 존재 합니다.\n');
    }
    else{
        //파일 생성
        let csv_string = '';
        arg.forEach((el,index)=>{
            csv_string += (index !== arg.length-1 ? `${el},`:`${el}`);
        })
        fs.writeFileSync('./'+table_name+'.csv', csv_string);
        console.log('파일이 생성되었습니다.\n');
    }
}

module.exports = create;