import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationType } from 'src/app/models/notification';
import { Tutorial } from 'src/app/models/tutorial.model';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { MatDialogComponent, ConfirmDialogData } from '../mat-dialog/mat-dialog.component';
@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit{
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  titleField = new FormControl();
  constructor(private tutorialService: TutorialService,
    private notificationService: NotificationService, 
    private dialog: MatDialogComponent) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }
  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }
  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.dialog.openDialog(new ConfirmDialogData("Confirm your selection", "Delete all tutorials?")).subscribe(
      selection => {
        if(selection){
          this.tutorialService.deleteAll()
            .subscribe(
              response => {
                console.log(response);
                this.refreshList();
                this.notificationService.sendNotification("All tutorials were deleted", NotificationType.info);
              },
              error => {
                console.log(error);
              });
          }
      },
      error => {
        console.log(error);
      }
    );      
  }
  searchTitle(): void {
    this.tutorialService.findByTitle(this.titleField.value)
      .subscribe(
        data => {
          this.tutorials = data;
          if(data.length === 0) {
            this.notificationService.sendNotification("No tutorials found", NotificationType.info);
          }
        },
        error => {
          console.log(error);
        });
  }

  publishTutorial(status: boolean): void {
    this.currentTutorial!.published = status;
    this.tutorialService.update(this.currentTutorial!._id, {published: status}).subscribe(
      response => {},
      error => {
        console.log(error);
      });
  }

  editTutorial(): void {  
    this.tutorialService.get(this.currentTutorial!._id).subscribe(
      response => {
        console.log(response);
      },
      error => {        
        console.log(error);
      });
  }
}