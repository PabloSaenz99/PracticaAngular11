import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-guard/auth.service';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';

@Component({
  selector: 'app-user-lateral-panel',
  templateUrl: './user-lateral-panel.component.html',
  styleUrls: ['./user-lateral-panel.component.scss']
})
export class UserLateralPanelComponent implements OnInit {
  user = new User();
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private tutorialService: TutorialService,
    private router: Router) {}

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

  findAllUserTutorials() {
    //Call here a service to send info to tutorialListComponent
    //this.router.navigate(['/tutorials']);
    //this.tutorialService.findByUser(this.user._id)
  }

}
