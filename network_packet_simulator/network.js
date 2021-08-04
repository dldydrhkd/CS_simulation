const data = require('./data_link.js');

const net = (li) => {
    console.log('>>요청 '+li+'\n');
    let source_ip = '192.168.1.5';
    let dest_ip = '192.168.1.9';
    let temp = `{${source_ip},${dest_ip},${li}}`;
    console.log(temp+'\n');
    data(temp);
}

module.exports = net;