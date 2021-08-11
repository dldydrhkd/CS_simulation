const url = class{
    #scheme;
    #host;
    #port;
    #pathComponents = [];
    #lastPathComponent;
    #query;
    #isFileURL = false;
    #user;
    #password;
    #absoluteString;
    constructor(link){
        var regexp = /(?<SCHEME>[a-zA-Z0-9-]+):\/\/((?<USER>[\w\d-]+(:(?<PASSWORD>[a-zA-Z0-9_-]+))?)@)?(?<HOST>[a-zA-Z0-9_\-.$]+)(:(?<PORT>[0-9]{1,4}))?((?<PATH>(\/(#|(#!)))?\/[\w\/!~.]*))?(\?(?<QUERY>[\w=&%.\-\+]+))?/;
        var res = link.match(regexp).groups;
        this.#scheme = res.SCHEME;
        this.#host = res.HOST;
        if(res.PORT) this.#port = res.PORT;
        else{
            if(this.#scheme == 'http') this.#port = 80;
            else if(this.#scheme == 'https') this.#port = 443;
        } 
        if(res.PATH){
            this.#pathComponents.push('/');
            let p = res.PATH.split('/');
            p.forEach((el) => {
                if(el!='') this.#pathComponents.push(el);
            });
        }
        if(this.#pathComponents) this.#lastPathComponent = this.#pathComponents[this.#pathComponents.length-1];
        if(res.QUERY) this.#query = res.QUERY;
        if(this.#scheme=='file') this.#isFileURL = true;
        if(res.USER) this.#user = res.USER.split(':')[0];
        if(res.PASSWORD) this.#password = res.PASSWORD;
        this.#absoluteString = link;
    }
    get scheme(){
        return this.#scheme;
    }
    get host(){
        return this.#host;
    }
    get port(){
        return this.#port;
    }
    get pathComponents(){
        return this.#pathComponents;
    }
    get lastPathComponent(){
        return this.#lastPathComponent;
    }
    get query(){
        return this.#query;
    }
    get isFileURL(){
        return this.#isFileURL;
    }
    get user(){
        return this.#user;
    }
    get password(){
        return this.#password;
    }
    get absoluteString(){
        let path = this.#pathComponents.join("/");
        path = path.length !== 1 ? path.substring(1) : path;
        this.#absoluteString =
        `${this.#scheme}` +
        `://${this.#user === null ? "" : this.#user}` +
        `${this.#password === null ? "" : `:${this.#password}`}` +
        `${this.#user === null ? "" : "@"}${this.#host}` +
        `${this.#port === null ? "" : `:${this.#port}`}` +
        `${path}` +
        `${this.#query === null ? "" : `?${this.#query}`}`
        return this.#absoluteString;
    }
    set host(new_host){
        if(typeof(new_host)=='String') this.#host = new_host;
    }
    set scheme(new_scheme){
        if(typeof(new_scheme)=='String') this.#scheme = new_scheme;
    }
    set lastPathComponent(new_path){
        if(typeof(new_path)=='String') this.#lastPathComponent=new_path;
    }
    set port(new_port){
        if(typeof(new_port) == 'number') this.#port = new_port;
    }
    set query(new_query){
        if(typeof(new_query)=='String') this.#query = new_query;
    }
    set user(new_user){
        if(typeof(new_user)=='String') this.#user = new_user;
    }
    set password(new_pwd){
        if(typeof(new_pwd)=='String') this.#password = new_pwd;
    }
    set isFileURL(bool){
        if(typeof(bool) == 'boolean') this.#isFileURL = bool;
    }
    appendPathComponent(new_path){
        this.#pathComponents.push(new_path);
        console.log(this.absoluteString);
    }
    deletePathComponent(){
        if(this.#pathComponents.length!=0){
            this.#pathComponents.pop();
            console.log(this.absoluteString);
        }
    }
    info(){
        console.log('==============link_info==============');
        console.log(`//url.host = ${this.host}\n`);
        console.log(`//url.lastPathComponent = ${this.lastPathComponent}\n`);
        console.log(`//url.pathComponents = ${this.pathComponents}\n`);
        console.log(`//url.port = ${this.port}\n`);
        console.log(`//url.query = ${this.query}\n`);
        console.log(`//url.scheme = ${this.scheme}\n`);
        console.log(`//url.isFileURL = ${this.isFileURL}\n`);
        console.log(`//url.user = ${this.user}\n`);
        console.log(`//url.password = ${this.password}\n`);
        console.log(`//url.absoluteString = ${this.absoluteString}\n`);
    }
    isEqual(cmp_url) {
        if (this.scheme == cmp_url.scheme && this.user==cmp_url.user && this.password==cmp_url.password && this.host==cmp_url.host && this.port==cmp_url.port){
            return 1;
        }
        else if (this.scheme == cmp_url.scheme && this.host == cmp_url.host && this.port == cmp_url.port){
            return 2;
        }
        else if (this.scheme == cmp_url.scheme && this.host == cmp_url.host && this.port == cmp_url.port && this.pathComponents.join('/') == cmp_url.pathComponents.join('/')){
            if(this.user==cmp_url.user && this.password==cmp_url.password && this.query == cmp_url.query){
                return 4;
            }
            return 3;
        }
        else{
            return 5;
        }
    }
}

module.exports = url;