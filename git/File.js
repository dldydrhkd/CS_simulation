export class file{
    constructor(file_name, file_content){
        this.name = file_name;
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        this.cur_date = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        this.status = "Untracked";             // Untracked
        this.contents = file_content;
    }
    set_cur_date(){
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        this.cur_date = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    set_Staged(){
        this.status = "Staged";
    }
    set_Unmodified(){
        this.status = "Unmodified";
    }
    change_contents(contents){
        this.contents = contents;
    }
    print_file_info(){
        console.log(this.name+'('+this.contents.length+')'+'\t'+this.cur_date+'\n\n');
    }
    get_name(){
        return this.name + '('+ this.contents.length + ')';
    }
}