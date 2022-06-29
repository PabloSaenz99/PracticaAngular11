import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  user = new User();

  constructor(private userService: UserService) { }
  ngOnInit(): void {}

  loginUser(): void{
    const data = {
      email: this.user.email,
      password: this.user.password
    };
    this.userService.login(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
