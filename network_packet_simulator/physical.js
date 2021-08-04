const phy = (str) => {
    let tmp=[];
    for(var i=0; i<str.length; i++){
        tmp.push(str.charCodeAt(i));
    }
    let result = '';
    tmp.forEach((el)=>result+=el.toString(16));
    console.log(result);
}

module.exports = phy;