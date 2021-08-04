const rev_data = require('./rev_data_link.js');

const rev_phy = (str) => {
    console.log('>>요청 ' + str + '\n');
    let tmp = [];
    for(var i=0; i<str.length; i+=2){
        tmp.push(str[i]+str[i+1]);
    }
    for(var i=0; i<tmp.length; i++){
        tmp[i]=parseInt(tmp[i],16);
    }
    str = "";
    for(var i=0; i<tmp.length; i++){
        str+=String.fromCharCode(tmp[i]);
    }
    console.log(str+'\n');
    rev_data(str);
}

rev_phy('2833433a35413a42343a39333a30313a34422c33433a35413a42343a36463a45413a44432c7b3139322e3136382e312e352c3139322e3136382e312e392c5b53594e2c31303030312c383038302c31302c756e646566696e65642c305d7d29')