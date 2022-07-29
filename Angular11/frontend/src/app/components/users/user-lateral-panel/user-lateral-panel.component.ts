import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-guard/auth.service';

@Component({
  selector: 'app-user-lateral-panel',
  templateUrl: './user-lateral-panel.component.html',
  styleUrls: ['./user-lateral-panel.component.scss']
})
export class UserLateralPanelComponent implements OnInit {
  user = new User();
  isLoggedIn = false;
  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    var token = await this.authService.getToken();    
    if(token !== ""){
      this.isLoggedIn = true;
      this.user = await this.authService.getUserByMailToken(token);      
    }
    else{
      this.isLoggedIn = false;
    }
  }

}
