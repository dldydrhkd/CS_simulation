const rev_net = require("./rev_network");

const rev_data = (str) => {
    console.log('>>요청 '+ str + '\n');
    let src_mac = str.substr(19,17);
    let dest_mac = str.substr(1,17);
    let my_mac = '3C:5A:B4:93:01:4B';
    if(my_mac!=dest_mac){
        return ;
    }
    console.log('수신 MAC 주소 (일치) => ' + dest_mac + '\n');
    console.log('발신 MAC 주소 => '+ src_mac + '\n');
    str = str.substr(37);
    str = str.substr(0,str.length-1);
    rev_net(str);
}

module.exports = rev_data;