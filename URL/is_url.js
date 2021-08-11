const check_url = (link) => {
    var regexp = /(?<SCHEME>[a-zA-Z0-9-]+):\/\/((?<USER>[\w\d-]+(:(?<PASSWORD>[a-zA-Z0-9_-]+))?)@)?(?<HOST>[a-zA-Z0-9_\-.$]+)(:(?<PORT>[0-9]{1,4}))?((?<PATH>(\/(#|(#!)))?\/[\w\/!~.]*))?(\?(?<QUERY>[\w=&%.\-\+]+))?/;
    try{
        var res = link.match(regexp).groups;
    }catch(err){
        throw new Error('url 형식이 올바르지 않습니다.');       // groups로 만들 수 없는경우
    }
    if(link.includes('^')){
        throw new Error('사용할 수 없는 특수문자가 있습니다.');     // 특수문자가 있는 경우
    }
    if(res===null){
        throw new Error('url 형식이 올바르지 않습니다.');   // scheme이 없거나 host가 없는경우
    }
    return true;
}

module.exports = check_url;