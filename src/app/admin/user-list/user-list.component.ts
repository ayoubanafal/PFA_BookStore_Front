import { Component, OnInit } from '@angular/core';
import { AppstateService } from 'src/app/services/appstate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  constructor(public appstate:AppstateService,private userService:UserService){}


  ngOnInit(): void {
    this.getUsersList();
  }


  HandlePagination(_t33: number) {
    this.appstate.setBookState({
      currentPage : _t33,
    })  
    this.getUsersList(this.appstate.UsersState.pageSize,this.appstate.UsersState.currentPage);
    }


  getUsersList(size=0, page=0){
      this.userService.getAlluser().subscribe(
        (data)=>{
          console.log(data);
            this.appstate.setUsers({
              users:data.content,
              totalPages:data.totalPages,
              totalElements:data.totalElements,
              offset:0,
              number:0,
              pageSize:8,
              currentPage:0,
            });
            console.log(this.appstate.UsersState.users);
        },
        (error)=>{
            console.log(error);
        }
      )
  }




}
