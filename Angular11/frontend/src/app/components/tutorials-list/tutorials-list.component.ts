import { Component, OnInit } from '@angular/core';
import { NotificationMsg, NotificationType } from 'src/app/models/notification';
import { Tutorial } from 'src/app/models/tutorial.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TutorialService } from 'src/app/services/tutorial.service';
@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit{
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';
  constructor(private tutorialService: TutorialService,
    private notificationService: NotificationService) { }
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
  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
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
}