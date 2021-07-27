const str = `<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"><BR/></P></BODY></HTML>`;

class Stack {
    constructor(){
        this.st = [];
    }
    push(element){
        this.st.push(element);
    }
    pop(){
        this.st.pop();
    }
    top(){
        return this.st[this.st.length-1];
    }
    isEmpty(){
        return this.st.length==0 ? true : false;
    }
}

class Tokenizer{
    tokenize(str){
        const tokenArray = [];
        let tmp = "";
        let tag_open = false;
        for(let i of str){
            if(i === '<'){
                tag_open=true;
                if(tmp!=""){
                    tokenArray.push(tmp);
                    tmp = "";
                }
                tmp += i;
            }
            else if(i === '>' && tmp != ""){
                if(tmp.includes('<')){
                    tokenArray.push(tmp+i);
                    tmp = "";
                }
                else{
                    tokenArray.push(tmp);
                    tmp = "";
                    tokenArray.push(i);
                }
                tag_open=false;
            }
            else if(i === ' ' && tag_open){
                if(tmp != ""){
                    tokenArray.push(tmp);
                    tmp = "";
                }
            }
            else if(i === '=' && tag_open){
                if(tmp != ""){
                    tokenArray.push(tmp);
                    tmp = "";
                }
                tokenArray.push(i);
            }
            else{
                tmp += i;
            }
        }
        return tokenArray;
    }
}

class Lexer{
    lex(tokenArray){
        const lexerArray = [];

        const empty = ["META", "LINK", "IMG"];

        let bool_Comment = false;
        let bool_Tag = false;
        let bool_Element = false;
        let bool_Value = false;

        for(let token of tokenArray){
            if(token[1]=='!'){
                bool_Comment = true;
                continue;
            }
            else if(bool_Comment){
                if(token.includes('>')){
                    bool_Comment = false;
                    continue;
                }
                else{
                    continue;
                }
            }
            else if(token.includes('/>') || token.includes('</')){
                lexerArray.push({type:"tag_end", value:token});
                bool_Tag = false;
            }
            else if(token.includes('<') && token.includes('>')){
                lexerArray.push({type: "tag_start", value:token});
                bool_Tag = true;
            }
            else if(token.includes('<')){
                lexerArray.push({type: "tag_start", value:token});
                bool_Tag = true;
                bool_Element = true;
            }
            else if(token.includes('>') && bool_Element){
                lexerArray.push({type:"tag_end", value:token});
                bool_Element = false;
            }
            else if(token === '=' && bool_Element){
                bool_Value = true;
                lexerArray.push({type:"Operator", value:token});
            }
            else if(bool_Tag && bool_Element){
                if(bool_Value === false){
                    lexerArray.push({type: "Attribute", value: token});
                }
                else{
                    lexerArray.push({type:"Value", value: token});
                    bool_Value = false;
                }
            }
            else{
                lexerArray.push({type:"Text", value:token});
            }
        }
        return lexerArray;
    }
}


const test =  `<HTML><HEAD><TITLE>Your Title Here</TITLE></HEAD><BODY BGCOLOR="FFFFFF"><CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"></CENTER><HR><a href="http://somegreatsite.com">Link Name</a>is a link to another nifty site<H1>This is a Header</H1><H2>This is a Medium Header</H2>Send me mail at<a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.<P>This is a new paragraph!</P><B>This is a new paragraph!</B><B><I>This is a new sentence without a paragraph break, in bold italics.</I></B></HR></BODY></HTML>`


class Parser{
    constructor(str){
        this.tokenizer = new Tokenizer();
        this.lexer = new Lexer();

        this.tokens = this.tokenizer.tokenize(str);
        this.lexes = this.lexer.lex(this.tokens);

        this.root = {};
        this.tokenStack = new Stack();
        this.result = null;
    }
    isValidBracket(){
        const empty = ["META", "LINK", "IMG"];
        let st = new Stack();
        for(let token of this.tokens){
            if(token.includes('!')) continue;
            if(token.includes('<')){
                if(empty.includes(token.replace('<','').toUpperCase())){
                    continue;
                }
                if(token.includes('/')){
                    if(token[token.length-2]=='/') continue;
                    else{
                        if(!st.isEmpty()){
                            let temp = st.top().replace('<','').replace('>','');
                            if(temp==token.replace('</','').replace('>','')){
                                st.pop();
                            }
                            else{
                                throw Error("올바른 XML 형식이 아닙니다.");
                            }
                        }
                        else{
                            throw Error("올바른 XML 형식이 아닙니다.");
                        }
                    }
                }
                else{
                    st.push(token);
                }
            }
        }
    }
    parser(){
        let bool_Tag = false;
        let bool_Element = false;
        const empty = ["META", "LINK", "IMG"];
        let name = "";
        for(const lex of this.lexes){
            let lexType = lex.type;
            let lexValue = lex.value;

            if(lexType=='tag_start'){
                bool_Tag = true;
                if(!lexValue.includes('>')){
                    bool_Element = true;
                }
                this.tokenStack.push({
                    element: lexValue.replace('<','').replace('>',''),
                    attributes: [],
                    text: "",
                    children: []
                })
                name = "";
            }
            else if(lexType == 'tag_end' && !bool_Element && lexValue[lexValue.length-2]=='/'){
                this.tokenStack.top()['children'].push({
                    element: lexValue.replace('/>','').replace('<',''),
                })
                bool_Tag = false;
            }
            else if(lexType == 'tag_end' && bool_Element){
                if(empty.includes(this.tokenStack.top()["element"].toUpperCase())){
                    let object = this.tokenStack.top();
                    this.tokenStack.pop();
                    if(object['text'] == "") delete object['text'];
                    if(object['attributes'].length === 0) delete object['attributes'];
                    if(object['children'].length === 0) delete object['children'];

                    if(!this.tokenStack.isEmpty()){
                        this.tokenStack.top()['children'].push(object);
                    }
                    else{
                        this.result = object;
                    }
                    bool_Tag = false;
                }
                bool_Element = false;
            }
            else if(lexType=='Attribute'){
                name = lexValue;
            }
            else if(lexType=='Value'){
                this.tokenStack.top()["attributes"].push({
                    name: name,
                    value: lexValue,
                })
            }
            else if(lexType == 'Text'){
                this.tokenStack.top().text+=lexValue;
            }
            else if(lexType=='tag_end' && !bool_Element && lexValue.includes('/')){
                let object = this.tokenStack.top();
                this.tokenStack.pop();
                if(object['text'] == "") delete object['text'];
                if(object['attributes'].length === 0) delete object['attributes'];
                if(object['children'].length === 0) delete object['children'];

                if(!this.tokenStack.isEmpty()){
                    this.tokenStack.top()['children'].push(object);
                }
                else{
                    this.result = object;
                }
            }
        }
        return this.result;
    }
}

//test1
//tokenize = new Tokenizer();
//console.log(tokenize.tokenize(str));
lex = new Lexer();
//console.log(lex.lex(tokenize.tokenize(str)));

p = new Parser(str);
p.isValidBracket();
console.dir((p.parser()), {depth: null});


// // test2
// tokenize = new Tokenizer();
// console.log(tokenize.tokenize(test));
// lex = new Lexer();
// console.log(lex.lex(tokenize.tokenize(test)));

// p = new Parser(test);
// p.isValidBracket();
// console.dir((p.parser()), {depth: null});

function elementByAttribute(dom, name, value){
    if(dom["attributes"]){
        for(var i=0; i<dom.attributes.length; i++){
            if(dom.attributes[i].name===name && dom.attributes[i].value===value){
                return dom.element;
            }
        }
    }
    if(dom["children"]){
        for(var i=0; i<dom["children"].length; i++){
            var new_dom = dom.children[i];
            return elementByAttribute(dom.children[i], name, value);
        }
    }
}

function findXPath(dom, link){
    let a = link.shift();
    let li = "";
    let num = 0;
    var i = 0;
    while(i<a.length){
        if(a[i]=='['){
            i++;
            break;
        }
        li+=a[i];
        i++;
    }
    while(i<a.length){
        if(a[i]==']'){
            num -= 1;
            break;
        }
        num = num*10 + a[i]-'0';
        i++;
    }
    if(link.length==0){
        if(num>=dom.length){
            throw Error("찾으려는 경로가 없습니다.");
        }
        else if(dom[num]["element"] && dom[num].element==li){
            return dom[num];
        }
        else{
            return Error("찾으려는 경로가 없습니다.");
        }
    }
    for(i=0; i<dom.length; i++){
        if(dom[i].element===a && num==i){
            return findXPath(dom[i].children,link);
        }
    }
}

// //test3
// _name = 'lang';
// _value = '"ko"';
// var oElement = elementByAttribute(p.parser(), _name, _value);
// console.log(`{ name : ${_name}, value : ${_value} } 의 attribute를 가진 element는 ${oElement} 입니다.`);
// _name = 'SRC';
// _value = '"codesquad.kr"';
// oElement = elementByAttribute(p.parser(), _name, _value);
// console.log(`{ name : ${_name}, value : ${_value} } 의 attribute를 가진 element는 ${oElement} 입니다.`);


// // test4
// const str2 = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"><BR/></P><P>CAMP</P></BODY></HTML>";
// tokenize = new Tokenizer();
// console.log(tokenize.tokenize(str2));
// lex = new Lexer();
// console.log(lex.lex(tokenize.tokenize(str2)));

// p = new Parser(str2);
// //p.isValidBracket();
// //console.dir((p.parser()), {depth: null});

// let path = "/HTML/BODY/P[1]";
// console.log(path);
// console.log(findXPath([p.parser()], path.slice(1,path.length).split('/')));




//test5
const str2 = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"><BR/></P><P>CAMP</P></BODY></HTML>";
tokenize = new Tokenizer();
console.log(tokenize.tokenize(str2));
lex = new Lexer();
console.log(lex.lex(tokenize.tokenize(str2)));

p = new Parser(str2);
//p.isValidBracket();
//console.dir((p.parser()), {depth: null});

let path = "/HTML/BODY/P[3]";
console.log(path);
console.log(findXPath([p.parser()], path.slice(1,path.length).split('/')));