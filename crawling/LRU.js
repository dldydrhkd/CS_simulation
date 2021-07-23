import { get } from 'http';
import {parsing} from './crawl.js'

const saveKeyword = [];
const saveContent  = [];
const saveHitCount = [];

const MAXKEY = 5;
const MAXDATA = 10;

function cache_get(cnt, keyword){
    cnt = saveHitCount[saveKeyword.indexOf(keyword)] + 1;   //hit count 증가

    //있는 내용으로 출력하고
    console.log("(본 검색 결과는 캐시에 저장된 내용을 표시합니다.)");       //있는 내용 출력
    console.log(saveContent[saveKeyword.indexOf(keyword)]);

    //기존 내용지우기
    saveKeyword.splice(saveKeyword.indexOf(keyword), 1);
    saveContent.splice(saveKeyword.indexOf(keyword), 1);        
    saveHitCount.splice(saveKeyword.indexOf(keyword), 1);
    return cnt;
}

function cache_set(cnt, keyword){
    if(saveKeyword.length>=MAXKEY){
        saveKeyword.shift(); //제일 첫번째 배열 삭제(가장 오래된 배열)
        saveContent.shift(); //내용도 삭제
        saveHitCount.shift(); //개수도 삭제
    }
    saveHitCount.push(cnt);
    saveKeyword.push(keyword);
}

export const lrucache = async (keyword) => {   

    if(keyword==="$cache"){
        if(saveKeyword.length==0){
            console.log("저장된 키워드가 없습니다.");
        }
        else{
            for(var i=0;i<saveKeyword.length; i++){
                console.log(`${saveKeyword[i]}(${saveHitCount[i]})`);
            }
        }     
    }

    else{
        var cnt = 1;
        var get = 1;
        if(saveKeyword.includes(keyword)){      //keyword가 있으면
            cnt = cache_get(cnt, keyword)
            get = 0;
        }

        cache_set(cnt, keyword);

        //get하지 못했을 경우에만 새로 검색하고 저장
        if(get===1){
            var content = await parsing(keyword);
    
            saveContent.push(content);
            
            console.log(saveContent);
        }
    }
};