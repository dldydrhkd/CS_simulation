import fs from 'fs';

export const init = (rl) =>{                // init 함수
    rl.setPrompt('/>');
    return './'
}

export const makeFolder = (repo_name, cur_dir) => {           //폴더 생성 함수
    let dir = cur_dir+repo_name;
    if(!fs.existsSync(dir)){                // 파일이 존재 하지 않을경우 파일 생성
        fs.mkdirSync(dir);
        console.log(`created ${repo_name} repository\n\n`)
        return true;
    }else{                      // 파일이 이미 존재할 경우
        console.log("The file exists already\n\n");
        return false;
    }
}

export const checkout = (line, rl, cur_dir) => {              // checkout 함수
    let file_name = line.split(' ')[1];
    let dir = cur_dir + file_name;
    if(!fs.existsSync(dir)){                        // 파일이 없는 경우
        console.log(`${file_name}을 찾을 수 없습니다.\n\n`);
    }
    else{                
        cur_dir += file_name+'/';
        rl.setPrompt(`${cur_dir.slice(1)}>`);
        return cur_dir;
    }
}

export const print_dir = (cur_dir, is_in_repo) =>{                 //print_dir
    let files = fs.readdirSync(cur_dir).filter((v)=>!v.includes('.'));         // 폴더 이외의 파일 filter
    for(let file of files){
        console.log(file+'/'+'\n');
    } 
    console.log('\n');
}

export const makeFile = (file_name, cur_dir, file_contents) => {            // file 생성
    let dir = cur_dir+file_name;
    fs.writeFileSync(dir,file_contents);                // 파일 생성
    console.log(file_name + '('+file_contents.length+')\n\n');
}

export const updateFile = (file_name, cur_dir, file_contents) => {
    let dir = cur_dir+file_name;
    fs.writeFileSync(dir,file_contents);                // 파일 생성
    console.log(file_name + '('+file_contents.length+')\n\n');
}


export const set_time = () => {
    let date = new Date()
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const get_cur_repo_name = (cur_dir) => {
    let repo_name = cur_dir.split('/');
    repo_name = repo_name[repo_name.length-2];          //레포 이름
    return repo_name;
}

export const log_export = (repo_name, cur_dir, log_info) =>{
    let date = new Date()
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let file_name = `${repo_name}-${year}${month}${day}-${hour}${minute}.git`;

    let dir = cur_dir+file_name;
    fs.writeFileSync(dir,log_info);                // 파일 생성
    console.log(`\nexport to ${file_name}\n\n`);
}
