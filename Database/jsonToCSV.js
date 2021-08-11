function jsonToCSV(json_data) { 
    let json_array = json_data; 
    let csv_string = '';
    let titles = Object.keys(json_array[0]);
    titles.forEach((title, index)=>{ 
        csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`); 
    });
    json_array.forEach((content, index)=>{ 
        let row = '';
        for(let title in content){
            row += (row === '' ? `${content[title]}` : `,${content[title]}`); 
        } 
        csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`); 
    })
    return csv_string; 
}

module.exports = jsonToCSV;