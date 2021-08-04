const rev_sess = (str) => {
    let tmp = str.split('\r\n');
    tmp = tmp.filter((el) => el!='');
    console.log(tmp[3]);
    
}

rev_sess('From: jk@boostcamp.connect.or.kr\r\nTo: camper@boostcamp.connect.or.kr\r\nTitle: Hello World\r\nSession-Id: 408c87ac-248b-419b-a85a-d0e050f503cc\r\n\r\nSGVsbG8gQm9vc3RDYW1wZXIsCglUaGlzIG1lc3NhZ2Ugd3JpdHRlbiBieSBKSy4K');