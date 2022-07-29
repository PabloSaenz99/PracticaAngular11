import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NotificationType } from 'src/app/models/notification';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  emailField = new FormControl('', [Validators.required, Validators.email]);
  passwordField = new FormControl('');
  hidePasswordField = true;

  constructor(private userService: UserService, private router: Router, private notificationService: NotificationService) {}
  ngOnInit(): void {}

  loginUser(): void{
    const data = {
      email: this.emailField.value,
      password: this.passwordField.value
    };
    this.userService.login(data).subscribe(
      res => {
        if(res == true) {
          this.router.navigate(['/tutorials']);
          this.notificationService.sendNotification("Login succesfull", NotificationType.success);
        }
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

  getErrorMessage(): String {
    if (this.emailField.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailField.hasError('email') ? 'Not a valid email' : '';
  }
}
