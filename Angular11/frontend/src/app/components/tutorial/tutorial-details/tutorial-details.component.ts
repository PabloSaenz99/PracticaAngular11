import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { FormControl } from '@angular/forms';
import { ConfirmDialogData, MatDialogComponent } from '../../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})

export class TutorialDetailsComponent implements OnInit {
  currentTutorial = new Tutorial();
  titleField = new FormControl();
  descriptionField = new FormControl();

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialogComponent) { }

  ngOnInit(): void {
    this.getTutorial(this.route.snapshot.params["id"]);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
          this.titleField.setValue(this.currentTutorial.title);
          this.descriptionField.setValue(this.currentTutorial.description);
        },
        error =>  console.log(error));
  }

  updatePublished(status: boolean): void {
    this.tutorialService.update(this.currentTutorial._id, {published: status})
      .subscribe(
        response => this.currentTutorial.published = status,
        error => console.log(error)
      );
  }

  updateTutorial(): void {
    var tut = this.currentTutorial;
    tut.title = this.titleField.value;
    tut.description = this.descriptionField.value;
    this.tutorialService.update(this.currentTutorial._id, tut)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.dialog.openDialog(new ConfirmDialogData("Confirm your selection", "Delete this tutorial?")).subscribe(
      selection => {
        if(selection)
          this.tutorialService.delete(this.currentTutorial._id)
            .subscribe(
              response => {
                console.log(response);
                this.router.navigate(['/tutorials']);
              },
              error => console.log(error)
            );
      },
      error => console.log(error)
    );
  }
}
