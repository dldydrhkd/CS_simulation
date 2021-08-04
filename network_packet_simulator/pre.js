const sess = require('./session.js');

let base64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function padding_front(str){
    let tmp = "";
    for(var i=0; i<8-str.length; i++){
        tmp += '0';
    }
    return tmp+str;
}

function str_to_8bit(str){
    let tmp = '';
    for(var i=0; i<str.length; i++){
        tmp+=padding_front(str.charCodeAt(i).toString(2));
    }
    return tmp;
}

function bit_by_6bit(str){
    let li = [];
    for(var i=0; i<str.length; i+=6){
        let tmp = "";
        for (var j=0; j<6; j++){
            if(i+j>=str.length) tmp+='0';
            else tmp+=str[i+j];
        }
        li.push(tmp);
    }
    return li;
}

function bits_6_to_dec(li){
    let tmp = "";
    li.forEach((el) => tmp+=base64_table[parseInt(el,2)]);
    if(4-li.length%4!=4){
        for(var i=0; i<4-li.length%4; i++){
            tmp+='=';
        }
    }
    return tmp;
}

function base64(str){
    let bits_8 = str_to_8bit(str);
    let bits_6 = bit_by_6bit(bits_8);
    return bits_6_to_dec(bits_6);
}

let presentation = (li) => {
    li[3] = base64(li[3]);
    console.log(li[3]);
    sess(li);
}

module.exports = presentation;