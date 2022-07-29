import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  emailField = new FormControl('', [Validators.required, Validators.email]);
  nameField = new FormControl('');
  passwordField = new FormControl('');
  birthdayField = new FormControl('');
  hidePasswordField = true;
  today = new Date().toISOString().slice(0, 10);
  submitted = false;

  constructor(private userService: UserService) { }
  ngOnInit(): void {}
  
  saveUser(): void {
    const data = {
      email: this.emailField.value,
      name: this.nameField.value,
      password: this.passwordField.value,
      birthday: this.birthdayField.value
    };
    console.log(data);
    
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
  }

  getErrorMessage(): String {
    if (this.emailField.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailField.hasError('email') ? 'Not a valid email' : '';
  }
}