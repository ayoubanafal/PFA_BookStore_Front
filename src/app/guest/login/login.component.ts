import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AppstateService } from 'src/app/services/appstate.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharingServiceService } from 'src/app/services/sharing-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;

  error:boolean = false;

  constructor(private fb:FormBuilder, private auth:AuthService,
    private route:Router,public appstate:AppstateService,
    private share:SharingServiceService){
  }


  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email:new FormControl("",[Validators.required,Validators.email]),
       password:new FormControl("",[Validators.required,Validators.minLength(8)])
      })
  }

  handleSubmit() {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
    (data)=>{
        this.error = false;
        this.share.setSetting(data);
        this.appstate.setAuthState({
          user: new User(data.id,data.username,data.email,data.role),
          isAuthenticated:true,
        })
        this.route.navigateByUrl('/')
    },
    (error)=>{
        this.error =true;
        console.log(error);
    }
    )
  }

}
