import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AppstateService } from 'src/app/services/appstate.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  newEmail!:string;


  constructor(private appstate:AppstateService,
    private userservice:UserService,
    private fb:FormBuilder,
    private router:Router
  ){}

  user:User = this.appstate.AuthState.user


  ngOnInit(): void {
    
  }

  Logout() {
    localStorage.clear();
    this.appstate.setAuthState({
      user:new User(),
      isAuthenticated:false
    })
    this.router.navigateByUrl('/login');
    }

  Submit(){
    console.log(this.newEmail);
    this.userservice.updateEmail(this.user.id, this.newEmail).subscribe({
      next:data=>{
          console.log(data);
          this.Logout();
      }
    })
  }

  DeleteAccount() {
    this.userservice.deleteUrAccount(this.user.id).subscribe({
      next:data=>{
        this.Logout();
      }
    })
  }





}
