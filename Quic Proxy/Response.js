class response{
    constructor(statusCode,responseLine,body,contentLength,fileURL){
        this.statusCode = statusCode;
        this.responseLine = responseLine;
        this.contentLength = contentLength;
        this.body = body;
        this.contentFileURL = fileURL;
    }

    getResponse(){
        return [
            `responseLine: ${this.responseLine}`,
            `statusCode: ${this.statusCode}`,
            `contentLength: ${this.contentLength}`,
            `contentFileURL: ${this.contentFileURL}`,
            `body: ${this.body}`,
            ''
        ].join('\n');
    }
}

module.exports = response