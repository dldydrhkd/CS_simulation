const rev_net = (str) => {
    console.log('>>요청 ' + str+'\n');
    let tmp = str.split(',');
    let src_ip = tmp[0].substr(1);
    let dest_ip = tmp[1];
    let my_ip = '192.168.1.9';
    if(my_ip != dest_ip){
        return ;
    }
    console.log('발신 IP 주소 => ' + src_ip + '\n');
    console.log('수신 IP 주소 (일치) => ' + dest_ip + '\n');
    tmp.shift();
    tmp.shift();
    str = tmp.join(',');
    str = str.substr(0, str.length-1);

}

module.exports = rev_net;