import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  today = new Date().toISOString().slice(0, 10);  
  user = new User();
  submitted = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  
  saveUser(): void {
    const data = {
      email: this.user.email,
      name: this.user.name,
      birthday: this.user.birthday
    };
    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
}
