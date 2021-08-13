const dgram = require('dgram');
const dnsSync = require('dns-sync');
const net = require('net');
const response = require('./Response.js');

const server = dgram.createSocket('udp4');

server.bind(12020,'0.0.0.0')   // server listening 0.0.0.0:12020

server.on('listening', function(){
    console.log('listening event');
})
server.on('message', async function(msg, rinfo){
    console.log(`Client Connected from ${rinfo.address}:${rinfo.port}`);  //어떤 IP와 Port번호에서 접속했는지 출력
    msg = msg.toString().split('\r\n');

    let host = msg[1].split(' ')[1];
    let port = msg[4].split(' ')[1];

    console.log('서버가 ip 주소를 받아오는 중입니다.');
    const serverIp = dnsSync.resolve(host);
    console.log('ip 주소: '+serverIp);

    console.log('서버가 ip주소에 request를 보내는 중 입니다.');

    var respon = await sendHttpRequest(msg,serverIp,port);

    var client = dgram.createSocket('udp4');

    var msg = new Buffer.from(respon.getResponse());

    client.send(msg, 0, msg.length, 3000, '127.0.0.1', function(err){
        if(err){
            console.log('실패');
        }
        console.log('받은 메시지를 client에게 재전송 합니다.');
        client.close();
    })
});

async function sendHttpRequest(msg, serverIp, port){
    const client = new net.Socket();
    msg = msg.join('\r\n');
    return new Promise((resolve, reject)=>{
        let respon = '';
        client.connect(port, serverIp, () => {
            client.write(msg);
        });

        client.on('data', async chunk => {
            respon += chunk;
            console.log('데이터 병합중...');
            console.log(chunk.toString());
            if (chunk.toString().replace(/[\n\r\t]/,'').endsWith('>')){
                client.end();
            }
        })


        client.on('end', () => {
            console.log('데이터 확인중.....')
            respon = respon.toString().split('\r\n');
            console.log(respon);
            console.log(`received response from ${serverIp}`);
        })

        client.on('close', async () => {
            let statusCode = respon[0].split(' ')[1];
            let responseLine = respon[0];
            let body = respon.slice(respon.indexOf('')).join('\n');
            let contentLength = body.length;
            let fileURL = '/';
            let res = new response(statusCode, responseLine, body, contentLength, fileURL);
            resolve(res);
        });
    })
}