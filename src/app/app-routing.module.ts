import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from '../app/auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { ManageTablesComponent } from './manage-tables/manage-tables.component';
import { TableEditComponent } from './manage-tables/table-edit/table-edit.component';
import { TableCreateComponent } from './manage-tables/table-create/table-create.component';

import { AdminGuard } from './auth/guards/admin.guard';
import { UserGuard } from './auth/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: AuthComponent},
  { path: 'signup', component: SignupComponent},
  
  { path: 'admin/users', component: ManageUsersComponent },
  { path: 'admin/users/create', component: ManageUsersComponent },
  { path: 'admin/users/edit', component: ManageUsersComponent },

  { path: 'admin/tables', component: ManageTablesComponent},
  { path: 'admin/tables/create', component: TableCreateComponent},
  { path: 'admin/tables/edit', component: TableEditComponent},

  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!', text: 'This page does not exist! Keep searching...'} },
  { path: 'not-authorized', component: ErrorPageComponent, data: {message: 'Not allowed!', text: 'You are not allowed to view this page!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
