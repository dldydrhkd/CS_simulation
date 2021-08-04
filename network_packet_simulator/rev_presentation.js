const rev_app = require('./rev_app.js');

let base64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function padding_front(str){
    let tmp = "";
    for(var i=0; i<6-str.length; i++){
        tmp += '0';
    }
    return tmp+str;
}

function bits8_to_str(str){
    let tmp = "";
    for(var i=0; i<str.length; i+=8){
        let tmp1 = "";
        for(var j=0; j<8; j++){
            tmp1+=str[i+j];
        }
        tmp+=String.fromCharCode(parseInt(tmp1,2));
    }
    return tmp;
}

function bits6_to_dec(str){
    li = [];
    for(var i=0; i<str.length; i++){
        li.push(base64_table.indexOf(str[i]));
    }
    for(var i=0; i<li.length; i++){
        li[i] = padding_front(li[i].toString(2));
    }
    str = "";
    for(var i=0; i<li.length; i++){
        str += li[i];
    }
    return bits8_to_str(str);
}

function without_padding(str){
    var i=str.length-1;
    for(i; i>=0; i--){
        if(str[i]!='=') break;
    }
    return (str.substr(0,i+1));
}

function decode(str){
    str = without_padding(str);
    return bits6_to_dec(str);
}

const rev_pre = (str) => {
    let tmp = str.split('\r\n');
    tmp = tmp.filter((el) => el!='');
    tmp = decode(tmp[4]);
    console.log(tmp);
    rev_app(tmp);
}

rev_pre('From: jk@boostcamp.connect.or.kr\r\nTo: camper@boostcamp.connect.or.kr\r\nTitle: Hello World\r\nSession-Id: 408c87ac-248b-419b-a85a-d0e050f503cc\r\n\r\nSGVsbG8gQm9vc3RDYW1wZXIsCglUaGlzIG1lc3NhZ2Ugd3JpdHRlbiBieSBKSy4K');