import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

import { TutorialsListComponent } from './components/tutorial/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/tutorial/add-tutorial/add-tutorial.component';

import { AddUserComponent } from './components/users/add-user/add-user.component';

import { SetTutorialUserComponent } from './components/tutorial/set-tutorial-user/set-tutorial-user.component';

import { LoginUserComponent } from './components/users/login-user/login-user.component';
import { AuthGuard } from './services/auth-guard/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
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
