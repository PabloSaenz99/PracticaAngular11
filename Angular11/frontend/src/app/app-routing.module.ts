import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

import { AddUserComponent } from './components/add-user/add-user.component';

import { SetTutorialUserComponent } from './components/set-tutorial-user/set-tutorial-user.component';

import { LoginUserComponent } from './components/login-user/login-user.component';
import { AuthGuard } from './services/auth-guard/auth.guard';

const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  { path: 'login', component: LoginUserComponent },
  { path: '', canActivate: [AuthGuard], children: [
    { path: 'tutorials', component: TutorialsListComponent },
    { path: 'tutorials/:id', component: TutorialDetailsComponent },
    { path: 'addTutorial', component: AddTutorialComponent },

    { path: 'setTutorialUser', component: SetTutorialUserComponent }
  ]}
];

function tokenGetter() {
  return localStorage.getItem("token");
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter
  }
};

@NgModule({
  imports: [RouterModule.forRoot(routes), JwtModule.forRoot(JWT_Module_Options)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
