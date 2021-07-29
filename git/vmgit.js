import readline from 'readline';
import {makeFolder, checkout, updateFile, print_dir, makeFile, init, get_cur_repo_name, log_export} from './utils.js';
import { repository } from './Repository.js';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let cur_dir = './';
let is_in_repo = false;
let repo = new Map();


rl.setPrompt('/>');
rl.prompt();
rl.on('line', function(line){
    let repo_name = get_cur_repo_name(cur_dir);       // 현재 레포 이름 가져오기
    if(line.match(/init[\s][A-z0-9_-]*[^\s]/)){         // init
        // 문자열 처리
        let repo_name = line.split(' ')[1];             // 레포 이름

        if(makeFolder(repo_name, cur_dir)){             // 실제 레포 생성
            repo.set(line.split(' ')[1], new repository(repo_name));        // 레포 객체 생성
        }               
    }
    else if(line==="status"){               // status
        if(is_in_repo){         // 레포에 있을 경우
            repo.get(repo_name).print_status();             // 해당 레포 정보 출력
        }
        else{                   //레포에 없을 경우
            print_dir(cur_dir);                     // 레포들 출력
        }
    }
    else if(line.match(/checkout[\s][A-z0-9_-]*[^\s]/)){            //checkout dir
        cur_dir = checkout(line, rl, cur_dir);              // 체크 아웃
        is_in_repo = true;                  // 레포에 있음 표시
        console.log('\n\n');
    }
    else if(line==="checkout"){             // checkout
        cur_dir = init(rl);                 // 초기화
        is_in_repo = false;                 // 레포에 없음 표시
        console.log('\n\n')
    }
    else if(line==="quit"){         //quit
        rl.close();
        process.exit();
    }
    else if(line.match(/new[\s][A-z0-9_-]*[\s]./)){         // make new file
        // 문자열 처리
        let file_name = line.split(' ')[1];         // 파일 이름
        let file_contents = "";
        line.split(' ').slice(2).forEach((el) => {
            file_contents+=el+' ';
        })
        file_contents = file_contents.slice(0,-1);          // 파일 내용

        makeFile(file_name, cur_dir, file_contents);                     // 실제 파일 생성
        repo.get(repo_name).create_file(file_name, file_contents);        // 해달 레포에 파일 객체 생성
    }
    else if(line.match(/update[\s][A-z0-9_-]*[\s]./)){
        //문자열 처리
        let file_name = line.split(' ')[1];         // 파일 이름
        let file_contents = "";
        line.split(' ').slice(2).forEach((el) => {
            file_contents+=el+' ';
        })
        file_contents = file_contents.slice(0,-1);          // 파일 내용


        updateFile(file_name, cur_dir, file_contents);          //실제 파일 업데이트
        repo.get(repo_name).change_file_contents(file_name, file_contents);       // 파일 객체 업데이트
    }
    else if(line.match(/add[\s][A-z0-9_-]*[^\s]/)){
        // 문자열 처리
        let file_name = line.split(' ')[1];                 // 파일 이름

        repo.get(repo_name).add(file_name);
    }
    else if(line.match(/commit[\s]./)){
        let file_contents = "";
        line.split(' ').slice(1).forEach((el) => {
            file_contents+=el+' ';
        })
        file_contents = file_contents.slice(0,-1);          // 파일 내용

        repo.get(repo_name).commit(file_contents);               // 커밋
    }
    else if(line==='log'){
        if(is_in_repo) repo.get(repo_name).print_log();
        else console.log('레포지토리가 아닙니다.');
    }
    else if(line==='export'){
        if(is_in_repo) log_export(repo_name, cur_dir, repo.get(repo_name).get_log());
        else console.log('레포지토리가 아닙니다.');
    }
    else if(line==='push'){
        if(is_in_repo) repo.get(repo_name).push();
        else console.log('레포지토리가 아닙니다.');
    }
    else if(line === "status remote"){
        if(is_in_repo) repo.get(repo_name).print_last_remote();
        else console.log('레포지토리가 아닙니다.');
    }
    else{                       // 명령어가 존재하지 않을 경우
        console.log('해당 명령어는 존재하지 않습니다.');
    }
    rl.prompt();
});

