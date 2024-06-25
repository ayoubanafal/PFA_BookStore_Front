import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public registerForm!:FormGroup;

  private responseToken!:string;

  public ErrorMessage!:string

  constructor(private fb:FormBuilder,private errorHandler:ErrorHandler,private authService:AuthService,private route:Router){

  }
  ngOnInit(): void {
    this.registerForm =this.fb.group({
      username: new FormControl("",Validators.required),
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(5)])
    })
    this.errorHandler.handleError(this.registerForm);
  }


HandleSubmit() {
  if(this.registerForm.valid){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      (data)=>{
        this.route.navigateByUrl('/login');
      },
      (error)=>{
          this.ErrorMessage=error.message;
      }
    );
  }
}



}
