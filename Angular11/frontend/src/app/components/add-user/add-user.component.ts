import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = {
    email: '',
    name: '',
    tutorials: []
  };
  submitted = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  saveUser(): void {
    const data = {
      email: this.user.email,
      name: this.user.name
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
    this.user = {
      email: '',
      name: '',
      tutorials: []
    };
  }
}
