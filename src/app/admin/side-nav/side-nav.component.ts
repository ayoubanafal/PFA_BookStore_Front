import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AppstateService } from 'src/app/services/appstate.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(public appstate:AppstateService,private router:Router){}
  navLinks: any[] = [
    { path: '/admin/', label: 'List Of Books'  },
    { path: '/admin/new-book', label: 'New Book' },
    { path: '/admin/user-list', label: 'User List',}
  ];


  HandleLogout() {
    localStorage.clear();
    this.appstate.setAuthState({
      user:new User(),
      isAuthenticated:false
    })
    this.router.navigateByUrl('/');
    }
}
