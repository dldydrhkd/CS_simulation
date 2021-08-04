const net = require('./network.js')

class TCP_HEADER{
    constructor(src,dest,seq,ack,pac,seg,len,data=undefined){
        this.source_port = src;
        this.dest = dest;
        this.seq_num = seq;
        this.ack_num = ack;
        this.packet = pac;
        this.data_seg = seg;
        this.data_len = len;
        this.data = data;
    }
    print(){
        console.log('Source Port : '+this.source_port);
        console.log('Destination Port : '+this.dest);
        console.log('Sequence Number : ' + this.seq_num);
        console.log('Ack Number : ' + this.ack_num);
        console.log('data_set : ' + this.data_seg);
        console.log('Content-Length : ' + this.data_len);
        console.log([this.packet, this.source_port, this.dest, this.seq_num, this.ack_num, this.data_seg, this.data_len]);
        console.log('\n');
    }
    print_data(){
        console.log('Source Port : '+this.source_port);
        console.log('Destination Port : '+this.dest);
        console.log('Sequence Number : ' + this.seq_num);
        console.log('data_set : ' + this.data_seg);
        console.log('Content-Length : ' + this.data_len);
        console.log('Data : '+this.data);
        console.log([this.packet, this.source_port, this.dest, this.seq_num, this.data_seg, this.data_len, this.data]);
        console.log('\n');
    }
}

class process{
    constructor(name,src, seq){
        this.name = name;
        this.established = false;
        this.src_port = src;
        this.seq_num = seq;
    }
    send(packet,dest,header){
        if(packet=='SYN'){
            console.log('>>Sending Packet : SYN');
            let header = new TCP_HEADER(this.src_port, dest.src_port, this.seq_num, undefined, packet, false, 0);
            return(header);
        }
        else if(packet=='SYN+ACK'){
            let new_header = new TCP_HEADER(this.src_port, dest.src_port, this.seq_num, header.seq_num+1, packet, false, 0);
            return new_header;
        }
        else if(packet=='ACK'){
            console.log('>>Sending Packet : ACK');
            let new_header = new TCP_HEADER(this.src_port, dest.src_port, header.ack_num, header.seq_num+1, packet, false, 0);
            return new_header;
        }
    }
    send_data(dest,header,data){
        if(this.name=='client'){
            let new_header;
            if(data.length>100){
                new_header = new TCP_HEADER(this.src_port, dest.src_port, header.seq_num+100, header.ack_num, 'DATA', true, 100, data.substr(0,100));
                console.log('>>Sending Packet: DATA');
                new_header.print_data();
                return [new_header, data.substr(100), data.length];
            }
            else{
                new_header = new TCP_HEADER(this.src_port, dest.src_port, header.seq_num+data.length, header.ack_num, 'DATA', false, data.length, data);
                console.log('>>Sending Packet: DATA');
                new_header.print_data();
                return [new_header, '', 0];
            }
            
        }
        else{
            let new_header = new TCP_HEADER(this.src_port, dest.src_port, header.seq_num, header.ack_num+1, 'ACK', false, 0);
            return new_header;
        }
    }
}

const trans = (li) => {
    let str = `From: ${li[0]}\nTo: ${li[1]}\nTitle: ${li[2]}\nSession-Id: ${li[4]}\nData: ${li[3]}`;
    console.log('>> 요청 데이터');
    console.log(`From: ${li[0]}\n`);
    console.log(`To: ${li[1]}\n`);
    console.log(`Title: ${li[2]}\n`);
    console.log(`Session-Id: ${li[4]}\n`);
    console.log(`Data: ${li[3]}`);

    let client = new process('client',10001,10);
    let server = new process('server',8080,100);

    let header = client.send('SYN',server,'');              // client send to server
    header.print();
    header = server.send('SYN+ACK',client, header);         // server send to client
    console.log('<<Received Packet : SYN+ACK');
    header.print();
    header = client.send('ACK',server,header);
    header.print();
    while(str.length>0){
        left = client.send_data(server,header,str);
        console.log('>>Received Packet : ACK');
        header = server.send_data(client,left[0]);
        header.print();
        str = left[1];
    }

    li = ['SYN',10001,8080,10,undefined,0];
    let tmp = '[';
    console.log(li.length)
    for(var i=0; i<li.length; i++){
        tmp += (typeof(li[i])?li[i]:'undefined');
        if(i!=li.length-1) tmp += ',';
    }
    tmp+=']';
    net(tmp);
}

module.exports = trans;