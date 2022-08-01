import { Injectable } from '@angular/core';
import { TutorialsListComponent } from 'src/app/components/tutorial/tutorials-list/tutorials-list.component';
import { UserLateralPanelComponent } from 'src/app/components/users/user-lateral-panel/user-lateral-panel.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {
//https://www.dotnettricks.com/learn/angular/sharing-data-between-angular-components-methods
  constructor(
    private sidebar: UserLateralPanelComponent,
    private tutorialList: TutorialsListComponent) {}

  findTutorialsByUSer(userId: string): void {
    this.tutorialList.
  }
}
