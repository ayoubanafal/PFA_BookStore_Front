import { Role } from "./role.enum";

export class User {
    id:number;
    username:string="";
    email:string="";
    token:string="";
    role:Role = Role.USER;

    constructor(id:number=1,username:string="",email:string="",role:Role=Role.USER){
        this.id=id;
        this.username=username;
        this.email=email;
        this.role=role;
    }
}