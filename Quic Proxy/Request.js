class createHttpRequest{
    constructor(url, method){
        let url_structure = new URL(url);
        this.url = url;
        this.path = url_structure.path ?? '/';
        if(!this.path.endsWith('/')) this.path+='/';
        this.method = method;
        this.accept = '*/*';
        this.host = url_structure.host;
        this.scheme = url_structure.protocol.replace(':','');
        this.port;
        if(url_structure.port){
            this.port = url_structure.port;
        }else{
            this.port = (this.scheme == 'http' ? 80 : 443);
        }
    }
    getRequestHeader(){
        let host = this.host;
        let requestHeader = [
            `${this.method} ${this.path} HTTP/1.1`,
            `HOST: ${host}`,
            `Accept: ${this.accept}`,
            `Scheme: ${this.scheme}`,
            `Port: ${this.port}`,
            ``,
            ``
        ]
        requestHeader = requestHeader.join('\r\n');
        return requestHeader;
    }
}

module.exports = createHttpRequest;