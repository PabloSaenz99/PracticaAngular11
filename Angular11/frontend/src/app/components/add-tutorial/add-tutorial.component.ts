import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit{
  titleField = new FormControl('');
  descriptionField = new FormControl();
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {}
  
  saveTutorial(): void {
    const data = {
      title: this.titleField.value,
      description: this.descriptionField.value
    };
    this.tutorialService.create(data)
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
}
