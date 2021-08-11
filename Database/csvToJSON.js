function csvToJSON(csv_string){ 
    let rows = csv_string.split("\r\n"); 
    let jsonArray = []; 
    let header = rows[0].split(","); 
    for(let i = 1; i < rows.length; i++){ 
        let obj = {}; 
        let row = rows[i].split(","); 
        for(let j=0; j < header.length; j++){ 
            obj[header[j]] = row[j]; 
        } 
        jsonArray.push(obj); 
    } 
    return [header,jsonArray];
}

module.exports = csvToJSON;