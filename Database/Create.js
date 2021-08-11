const create = (str) => {
    let table_name = '';
    let arg = [];
    var i=13;
    while(str[i]!=' ' && i<str.length){
        table_name +=str[i];
        i++;
    }
    i+=2;
    while(str[i]!=')' && i<str.length){
        if(str[i]==' ') i++;
        let column_name = '';
        while(str[i]!=' '){
            column_name += str[i];
            i++;
        }
        i++;
        let data_type = '';
        while(str[i]!=',' && str[i]!=')'){
            data_type += str[i];
            i++;
        }
        arg.push({column_name, data_type});
    }
}