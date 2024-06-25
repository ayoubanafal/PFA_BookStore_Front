import { Component, OnInit } from '@angular/core';
import { AppstateService } from './services/appstate.service';
import { SharingServiceService } from './services/sharing-service.service';
import { User } from './Models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BookSellerAngular';

  constructor(
    public appstate: AppstateService,
    private share: SharingServiceService,
  ) {}

  ngOnInit(): void {
    try {
      let data = this.share.getSetting();
      if (data && !this.share.isTokenExpired(data.token)) {
        localStorage.clear();
      } else if (data) {
        console.log(data);
        this.appstate.setAuthState({
          user: new User(data.id, data.username, data.email, data.role),
          isAuthenticated: true,
        });
      } else {
        console.error("No data available from sharing service");
      }
    } catch (error) {
      console.error("An error occurred while initializing the app:", error);
    }
  }
}
