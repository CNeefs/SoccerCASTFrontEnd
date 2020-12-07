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

import { AuthGuardService } from './auth/guards/auth-guard.service';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { TeamCreateComponent } from './manage-teams/team-create/team-create.component';
import { TeamEditComponent } from './manage-teams/team-edit/team-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: AuthComponent},
  { path: 'signup', component: SignupComponent},

  { 
    path: 'admin',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: ManageUsersComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'USER_VIEW' },
          },
          {
            path: 'create',
            component: UserCreateComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'USER_CREATE' },
          },
          {
            path: 'edit',
            component: UserEditComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'USER_EDIT' },
          }
        ]
      },
      {
        path: 'tables',
        children: [
          {
            path: '',
            component: ManageTablesComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TABLE_VIEW' },
          },
          {
            path: 'create',
            component: TableCreateComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TABLE_CREATE' },
          },
          {
            path: 'edit',
            component: TableEditComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TABLE_EDIT' },
          }
        ]
      },
      {
        path: 'competitions',
        children: [
          {
            path: '',
            component: ManageCompetitionsComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'COMPETITION_VIEW' },
          },
          {
            path: 'create',
            component: CompetitionCreateComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'COMPETITION_CREATE' },
          },
          {
            path: 'edit',
            component: CompetitionEditComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'COMPETITION_EDIT' },
          }
        ]
      },
      {
        path: 'tournaments',
        children: [
          {
            path: '',
            component: ManageTournamentsComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TOURNAMENT_VIEW' },
          },
          {
            path: 'create',
            component: TournamentCreateComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TOURNAMENT_CREATE' },
          },
          {
            path: 'edit',
            component: TournamentEditComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TOURNAMENT_EDIT' },
          }
        ]
      }
    ]
  },

  { path: 'admin/teams', component: ManageTeamsComponent},
  { path: 'admin/teams/create', component: TeamCreateComponent},
  { path: 'admin/teams/edit', component: TeamEditComponent},

  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!', text: 'This page does not exist! Keep searching...'} },
  { path: 'not-authorized', component: ErrorPageComponent, data: {message: 'Not allowed!', text: 'You are not allowed to view this page!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
