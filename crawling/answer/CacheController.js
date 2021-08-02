const { executeGoogleCraler } = require('./Crawler.js');
const CacheStorage = require('./CacheStorage.js');

const CacheController = {
    init({cacheMaxSize=3}){
        CacheStorage.init({cacheMaxSize});
        this.query = '';
        this.readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.inputQuery();
    },
    inputQuery(){
        this.readline.question('검색어 입력 : ', (query) => {
            this.query = query;
            if(query.toLowerCase() === "$cache"){
                const cachedQueries = CacheStorage.getStroages().entries();
                const printString = [...cachedQueries].reduce( (result, next) => `${result}, ${next[0]}:${next[1].hitCount}`, ``).slice(1);
                console.log(printString);
                this.inputQuery();
            }
            else{
                let cachedData = CacheStorage.getCachedData(query);
                if(cachedData){
                    console.log('(본 검색 결과는 캐시에 저장된 내용을 표시합니다.)');
                    console.log(cachedData.value);
                    this.inputQuery();
                }
                else{
                    executeGoogleCrawler(query, this.afterCrawlerCallback.bind(this));
                }
            }
        });
    },
    afterCrawlerCallback(searchResult){
        console.log(searchResult);
        this.inputQuery();
        CacheStorage.add(this.query, searchResult);
    }
};

CacheController.init({
    cachedMaxSize : 3
});