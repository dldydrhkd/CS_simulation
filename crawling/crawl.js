import axios from "axios";   // url의 html을 가지고 오는 역할
import cheerio from "cheerio";   // 가지고 온 data를 jquery처럼 parsing 가능하게 해줌

const getHTML = async(keyword) => {   // async 방식으로 동작하며, keyword는 검색 keyword
  try {
    return await axios.get("https://search.naver.com/search.naver?display=15&f=&filetype=0&page=2&query="+encodeURI(keyword)+"&research_url=&sm=tab_pge&start=1&where=web")  //검색했을때의 html을 return 해준다
  }catch(err){
    console.log(err)
  }
}


export const parsing = async(keyword) => {
  const html = await getHTML(keyword);
  const $ = cheerio.load(html.data);  // jQuery에서는 $를 자주 쓴다
                                      // 실제 코드는 data에 들어있다

  const $searchList = $(".total_wrap");
  
  let searches = [];
  $searchList.each((idx,node) => {
    searches.push({
      title: $(node).find(".total_tit > a").text(),
      url: $(node).find(".total_tit > a").attr('href'),
      preview: $(node).find(".total_dsc_wrap > a").text()
    })
  });
  return searches.slice(0,9);
}

