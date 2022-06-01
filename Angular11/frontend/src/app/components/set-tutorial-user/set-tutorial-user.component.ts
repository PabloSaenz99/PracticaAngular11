import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-tutorial-user',
  templateUrl: './set-tutorial-user.component.html',
  styleUrls: ['./set-tutorial-user.component.css']
})

export class SetTutorialUserComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial;
  currentTutorialIndex = -1;
  title = '';

  users?: User[];
  currentUser: User;
  currentUserIndex = -1;
  email = '';

  constructor(
    private tutorialService: TutorialService,
    private userService: UserService) { 
    
    this.currentUser = new User();
    this.currentTutorial = new Tutorial();
  }

  ngOnInit(): void {
    this.retrieveTutorials();
    this.retrieveUsers();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentTutorialIndex = index;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentUserIndex = index;
  }

  setUserTutorial(): void{

    console.log(this.currentTutorial, this.currentUser)

    const data: { tutorialId: string, userId: string } = {
      tutorialId: this.currentTutorial._id,
      userId: this.currentUser._id
    }
    console.log(data)
    this.userService.addTutorial(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    //Maybe add a reference to the user in the tutorial?
  }
}
