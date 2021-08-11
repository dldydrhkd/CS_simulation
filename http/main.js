const readline = require('readline');
var request = require('request');
const cheerio = require('cheerio');
const https = require('https');

let total_domain = new Map();
let total_request = 0;
let total_img = 0;
let total_code = 0;
let total_capacity = 0;
let redirection = 0;
let total_cache = 0;
let total_loading = 0;

let biggest_capacity = 0;
let biggest_capacity_name = '';
let longest_wait = 0;
let longest_wait_name = '';
let longest_download = 0;
let longest_download_name = '';

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.question('> ', function(url){
    main(url);
    rl.close();
})

async function main(url) {
    https.get('https://'+url+'/', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', async() => {
            const $ = cheerio.load(data);
            const $link = $('link').toArray();
            $link.forEach(el => {
                if(el.attribs.href) download(el.attribs.href);
            })

            const $imgs = $('img').toArray();
            $imgs.forEach(el =>{
                if(el.attribs.src) download(el.attribs.src);
            })
            const $script = $('script').toArray();
            $script.forEach(el => {
                if(el.attribs.src) download(el.attribs.src);
            })
        });
    })
    setTimeout(() => {   
        console.log("=======================")
        console.log(`도메인 개수 : ${total_domain.size}`);
        console.log(`요청 개수 : ${total_request}`);
        console.log(`이미지(png, gif, jpg)개수 : ${total_img}`);
        console.log(`코드(css,js)개수 : ${total_code}`);
        console.log(`전송 용량 : ${(total_capacity/1024).toFixed(2)}MB`);
        console.log(`전체 로딩 시간 : ${total_loading.toFixed(2)}ms\n`);

        console.log(`가장 큰 용량 : ${biggest_capacity_name} ${biggest_capacity/1024}KB`);
        console.log(`가장 오랜 대기 시간 : ${longest_wait_name} ${longest_wait}ms`);
        console.log(`가장 오랜 다운로드 시간 : ${longest_download_name} ${longest_download}ms`);
    },2000)
}

function download(link){
    return new Promise((resolve, reject) => {
        let waiting = new Date();
        request({url:link,time:true},(err,resp) => {
            waiting = new Date() - waiting;
            if(err) return;
            var title = link.split('/').reverse()[0].indexOf('?')!=-1 ? link.split('/').reverse()[0].split('?')[0] : link.split('/').reverse()[0];
            var domain = link.split('/')[2];
            var type = title.split('.').reverse()[0]
            console.log('>>'+title);
            console.log(`도메인 : ${domain}`); // 정규식 사용하면 좋을듯
            console.log(`스킴 : ${link.split(':')[0]}`);
            console.log(`경로 : ${link.split(`//`)[1].substring(link.split(`//`)[1].indexOf('/')).split('?')[0]}`);
            console.log(`종류 : ${type}`);
            console.log(`용량 : ${(resp.body.length/1024).toFixed(2)}KB`);
            console.log(`대기 시간 : ${waiting}ms`);
            console.log(`다운로드 시간 : ${(resp.timings.end-resp.timings.response).toFixed(2)}ms\n`)
            
            if(total_domain.has(domain)){
                total_domain.set(domain,total_domain.get(domain)+1);
            }else{
                total_domain.set(domain,1);
            }

            total_request++;

            type==('css' || 'js') ? total_code++ : total_img++;
            
            total_capacity+=resp.body.length;

            total_loading += resp.timings.response;

            total_loading += waiting;

            if(biggest_capacity < resp.body.length){
                biggest_capacity = resp.body.length;
                biggest_capacity_name = title;
            }

            if(longest_wait < waiting){
                longest_wait = waiting;
                longest_wait_name = waiting;
            }

            if(longest_download < resp.timings.end-resp.timings.response){
                longest_download = resp.timings.end-resp.timings.response;
                longest_download_name = title;
            }
        })
    })
}


