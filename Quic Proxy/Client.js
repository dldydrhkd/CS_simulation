const dgram = require('dgram');
const createHttpRequest = require('./Request.js');


const client = dgram.createSocket('udp4');          // client 소켓 생성
const url = new createHttpRequest("http://www.naver.com/", 'GET');      // URL parsing

const msg = Buffer.from(url.getRequestHeader());

client.send(msg,0,msg.length, 12020, function(err){
    if(err){
        console.log('UDP message send error', err);
        return;
    }
    else{
        console.log(url.getRequestHeader());
        console.log('전송 완료');
        client.close();
    }
});

var server = dgram.createSocket('udp4');
server.bind({port:3000}, ()=>{
    server.setBroadcast(true);
});

server.on('listening', function() {
    console.log('listening event');
});

server.on('message', function(msg, rinfo) {
    console.log('메세지 도착', rinfo.address, msg.toString());
});

server.on('close', function() {
    console.log('close event');
});