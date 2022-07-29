import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth-guard/auth.service';
@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit{
  images = new Array<string>();
  actualImage = "";
  titleField = new FormControl('');
  descriptionField = new FormControl();
  imageField = new FormControl()
  submitted = false;

  constructor(private tutorialService: TutorialService,
    private authService: AuthService) { }

  ngOnInit(): void {}
  
  async saveTutorial(): Promise<void> {
    var tut = new Tutorial();
    var userId = await (await this.authService.getUserByMailToken(await this.authService.getToken()))._id
    tut.creatorUserId = userId;
    tut.title = this.titleField.value !== null ? this.titleField.value: "";
    tut.description = this.descriptionField.value !== null ? this.descriptionField.value: "";
    tut.images = this.images;
    
    this.tutorialService.create(tut)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newTutorial(): void {
    this.submitted = false;
  }

  addImage(): void {
    if(this.actualImage !== "") {      
      this.images.push(this.actualImage);
      this.imageField.setValue("");
    }
  }
}