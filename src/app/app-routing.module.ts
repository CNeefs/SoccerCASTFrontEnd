import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from '../app/auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserCreateComponent } from './manage-users/user-create/user-create.component';
import { UserEditComponent } from './manage-users/user-edit/user-edit.component';

import { ManageTablesComponent } from './manage-tables/manage-tables.component';
import { TableEditComponent } from './manage-tables/table-edit/table-edit.component';
import { TableCreateComponent } from './manage-tables/table-create/table-create.component';

import { ManageCompetitionsComponent } from './manage-competitions/manage-competitions.component';
import { CompetitionEditComponent } from './manage-competitions/competition-edit/competition-edit.component';
import { CompetitionCreateComponent } from './manage-competitions/competition-create/competition-create.component';

import { ManageTournamentsComponent } from './manage-tournaments/manage-tournaments.component';
import { TournamentEditComponent } from './manage-tournaments/tournament-edit/tournament-edit.component';
import { TournamentCreateComponent } from './manage-tournaments/tournament-create/tournament-create.component';

import { AdminGuard } from './auth/guards/admin.guard';
import { UserGuard } from './auth/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: AuthComponent},
  { path: 'signup', component: SignupComponent},
  
  { path: 'admin/users', component: ManageUsersComponent },
  { path: 'admin/users/create', component: UserCreateComponent },
  { path: 'admin/users/edit', component: UserEditComponent },

  { path: 'admin/tables', component: ManageTablesComponent},
  { path: 'admin/tables/create', component: TableCreateComponent},
  { path: 'admin/tables/edit', component: TableEditComponent},
  
  { path: 'admin/competitions', component: ManageCompetitionsComponent},
  { path: 'admin/competitions/create', component: CompetitionCreateComponent},
  { path: 'admin/competitions/edit', component: CompetitionEditComponent},
  
  { path: 'admin/tournaments', component: ManageTournamentsComponent},
  { path: 'admin/tournaments/create', component: TournamentCreateComponent},
  { path: 'admin/tournaments/edit', component: TournamentEditComponent},

  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!', text: 'This page does not exist! Keep searching...'} },
  { path: 'not-authorized', component: ErrorPageComponent, data: {message: 'Not allowed!', text: 'You are not allowed to view this page!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
