import { file } from "./File.js";
import { set_time } from "./utils.js";
import {log} from './Log.js';

export class repository{
    constructor(repo_name){
        this.name = repo_name;
        this.working_directory = new Map();
        this.staging_area = new Map();
        this.git_repo = new Map();
        this.remote = [];
        this.log_lists = [];
    }
    create_file(file_name, contents){
        this.working_directory.set(file_name, new file(file_name, contents));
    }
    change_file_contents(file_name, contents){
        if(this.working_directory.has(file_name)){
            let tmp = this.working_directory.get(file_name);
            tmp.change_contents(contents);
            tmp.set_cur_date();
        }
        else{
            this.working_directory.set(file_name, new file(file_name, contents));
        }
    }
    print_status(){
        console.log('---Working Directory/\n');
        for (let obj of this.working_directory.values()) obj.print_file_info();
        console.log('---Staging Area/\n');
        for (let obj of this.staging_area.values()) obj.print_file_info();
        console.log('---Git Repository/\n');
        for (let obj of this.git_repo.values()) obj.print_file_info();
        console.log('\n');
    }
    add(file_name){
        if(this.working_directory.has(file_name)){
            console.log('---Staging Area/\n')
            let tmp = this.working_directory.get(file_name);
            tmp.set_Staged();
            this.working_directory.delete(file_name);
            this.staging_area.set(file_name, tmp);
            tmp.print_file_info();
        }
    }
    commit(contents){
        console.log('--commit files/\n');
        for (let obj of this.staging_area.values()){
            let t = set_time();
            obj.set_Unmodified();
            this.git_repo.set(obj.file_name, obj);
            console.log(obj.get_name()+'\t'+t+'\n\n');
            this.log_lists.push(new log(obj.get_name(), contents, t));
        } 
        this.staging_area.clear();
    }
    print_log(){
        this.log_lists.forEach((el) => {
            console.log('commit \"'+el.comment+'\"\n');
            console.log(el.file_name+'\t'+el.log_time+'\n');
        })
    }
    get_log(){
        let str = '';
        this.log_lists.forEach((el) => str+= 'commit '+el.comment+'\n'+el.file_name+'\t'+el.log_time+'\n');
        return str;
    }
    push(){
        console.log('push some commits...\n');
        this.log_lists.forEach((el) => {
            console.log("commit \""+el.comment+"\"pushed\n");
            this.remote.push(el);
        });
        this.git_repo.clear();
        this.log_lists = [];
    }
    print_last_remote(){
        if(this.remote.length === 0){
            console.log("비어 있습니다.");
        }
        else{
            let last_log = this.remote[this.remote.length-1];
            console.log(`last commit ${last_log.comment}\n`);
            console.log(last_log.file_name + last_log.log_time+'\n\n');
        }
    }
}