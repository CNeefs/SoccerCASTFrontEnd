import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from '../app/auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ManageUsersDetailComponent } from './manage-users/manage-users-detail/manage-users-detail.component';


import { AdminGuard } from './auth/guards/admin.guard';
import { UserGuard } from './auth/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: AuthComponent},
  { path: 'signup', component: SignupComponent},
  
  { path: 'manage-users', component: ManageUsersComponent, children: [
    // { path: 'new', component: ManageUsersEditComponent },
    { path: ':id', component: ManageUsersDetailComponent },
    // { path: ':id/edit', component: ManageUsersEditComponent }
  ]},

  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!', text: 'This page does not exist! Keep searching...'} },
  { path: 'not-authorized', component: ErrorPageComponent, data: {message: 'Not allowed!', text: 'You are not allowed to view this page!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
