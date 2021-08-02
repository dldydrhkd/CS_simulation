const Crawler = require('crawler');

module.exports.executeGoogleCrawler = (query, cb) => {
    const crawler = new Crawler({
        maxConnections: 10,
        callback: function (error, res, done){
            if(error){
                console.log(error);
            }
            else{
                const $ = res.$;
                const nodes = $('#main .ZINbbc.xpd.uUPGi').toArray();

                const result = nodes
                    .filter((v) => $(v).find('.kCrYT > a').attr('href'))
                    .map((v) => {
                        const decodedLINK = decodeURI(v)
                            .replace(/\/url\?q=/, '')
                            .replace(/\&sa.+/, '');
                        const title = $(v).find('.kCrYT h3').text();
                        const desc = $(v)
                            .find('.BNeawe.s3v9rd.AP7Wnd .BNeawwe.s3v9rd.AP7Wnd')
                            .text();
                                        
                        return {
                            title,
                            decodedLINK,
                            desc,
                        };
                    });
                cb(result);
            }
            done();
        },
    });
    crawler.queue(`https://www.google.com/search?q=${query}`);
};