import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NotificationType } from 'src/app/models/notification';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService, private router: Router, private notificationService: NotificationService) { }
  ngOnInit(): void {}

  loginUser(): void{
    const data = {
      email: this.user.email,
      password: this.user.password
    };
    this.userService.login(data).subscribe(
      res => {
        this.router.navigate(['/tutorials']);
        this.notificationService.sendNotification("Login succesfull", NotificationType.success);
      },
      error => {                
        console.log(error);
      });
  }

  logoutUser(): void{
    this.userService.logout().subscribe(
      res => { 
        this.notificationService.sendNotification("Logout succesfull", NotificationType.success);
      },
      error => {                
        console.log(error);
      });
  }
}
