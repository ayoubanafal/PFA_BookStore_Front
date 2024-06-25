import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AppstateService } from 'src/app/services/appstate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public appstate:AppstateService,private router:Router){

  }

  public routes =[
    { Path: 'home', ComponentName: "Home"},
    { Path:'purchaseHistory', ComponentName:"Purchase"}
  ]

  HandleLogout() {
    localStorage.clear();
    this.appstate.setAuthState({
      user:new User(),
      isAuthenticated:false
    })
    this.router.navigateByUrl('/login');
    }
}
