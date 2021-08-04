const phy = require('./physical.js');

const data = (net) => {
    console.log(`>>요청 ${net}\n`);
    let src_mac = '3C:5A:B4:93:01:4B'
    let dest_mac = '3C:5A:B4:6F:EA:DC'
    let tmp = `(${src_mac},${dest_mac},${net})`
    console.log(tmp+'\n');
    phy(tmp);
}

module.exports = data;