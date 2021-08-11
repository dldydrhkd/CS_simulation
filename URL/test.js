const url = require('./Url.js');
const check_url = require('./is_url.js');

var naverurl = new url("http://admin@naver.com/#!/home?query=camp");
var url1 = new url("http://admin:1234@naver.com:80")
var url2 = new url("http://admin@naver.com");
var url3 = new url("http://admin@naver.com/#!/home");
var url4 = new url("http://admin@naver.com/#!/home?query=camp")
var url5 = new url("http://admin@naver.com/abc")

/*
1.scheme부터 username, password, host:port까지 같은 상태

2.scheme과 host:port만 같은 상태 (username, password 제외)

3.scheme부터 path까지만 모두 같은 상태

4.완벽하게 같은 상태

5.그 외 서로 다른 상태
*/

test("naverurl & url1", () => {
    expect(naverurl.isEqual(url1)).toBe(1);
  });

test("naverurl & url2", () => {
    expect(naverurl.isEqual(url2)).toBe(2);
});

test("naverurl & url3", () => {
    expect(naverurl.isEqual(url3)).toBe(3);
});
  
test("naverurl & url4", () => {
    expect(naverurl.isEqual(url4)).toBe(4);
});
  
test("naverurl & url5", () => {
    expect(naverurl.isEqual(url5)).toBe(5);
});

test("path append & delete test", () => {
    let new_url = new url("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2021/first/second/last?query=ab&param=12");
    expect(new_url.absoluteString).toBe("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2021/first/second/last?query=ab&param=12")
    new_url.appendPathComponent("basecamp");
    new_url.appendPathComponent("camp");
    expect(new_url.absoluteString).toBe("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2021/first/second/last/basecamp/camp?query=ab&param=12")
    new_url.deletePathComponent();
    expect(new_url.absoluteString).toBe("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2021/first/second/last/basecamp?query=ab&param=12")
})
  
test("Error check", () => {   
      expect(() => check_url("www.edwith.org/challenge-web/lecture/949324?isDesc=false")).toThrow("url 형식이 올바르지 않습니다.")
})

