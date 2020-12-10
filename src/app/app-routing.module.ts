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
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ViewTeamsComponent } from './view-teams/view-teams.component';
import { TeamDetailComponent } from './view-teams/team-detail/team-detail.component';
import { ViewRankingsComponent } from './view-rankings/view-rankings.component';

import {DocumentationhomeComponent} from './documentation/documentationhome/documentationhome.component';
import { UserDocumentationComponent} from './documentation/user-documentation/user-documentation.component';
import {TeamDocumentationComponent} from './documentation/team-documentation/team-documentation.component';
import {TableDocumentationComponent} from './documentation/table-documentation/table-documentation.component';
import {MatchesDocumentationComponent} from './documentation/matches-documentation/matches-documentation.component';
import{CompetitionsDocumentationComponent} from './documentation/competitions-documentation/competitions-documentation.component';
import {TournamentsDocumentationComponent} from './documentation/tournaments-documentation/tournaments-documentation.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: AuthComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'documentation', children: [
    {path: '', component: DocumentationhomeComponent},
    {path: 'user', component: UserDocumentationComponent},
    {path: 'teams', component: TeamDocumentationComponent},
    {path: 'table', component: TableDocumentationComponent},
    {path: 'matches', component: MatchesDocumentationComponent},
    {path: 'competitions', component: CompetitionsDocumentationComponent},
    {path: 'tournaments', component: TournamentsDocumentationComponent}
  ]},

  {
    path: 'user',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: MyProfileComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'PROFILE_VIEW' },
          }
        ]
      },
      {
        path: 'teams',
        children: [
          {
            path: '',
            component: ViewTeamsComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TEAM_VIEW' }
          },
          {
            path: 'detail',
            component: TeamDetailComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'TEAM_VIEW' }
          }
        ]
      },
      {
        path: 'rankings',
        children: [
          {
            path: '',
            component: ViewRankingsComponent,
            canActivate: [AuthGuardService],
            data: { auth: 'RANKING_VIEW' },
          }
        ]
      },
    ]
  },
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
        canActivate: [AuthGuardService],
        data: { auth: 'USER_MANAGE' },
        children: [
          {
            path: '',
            component: ManageUsersComponent
          },
          {
            path: 'create',
            component: UserCreateComponent
          },
          {
            path: 'edit',
            component: UserEditComponent
          }
        ]
      },
      {
        path: 'tables',
        canActivate: [AuthGuardService],
        data: { auth: 'TABLE_MANAGE' },
        children: [
          {
            path: '',
            component: ManageTablesComponent
          },
          {
            path: 'create',
            component: TableCreateComponent
          },
          {
            path: 'edit',
            component: TableEditComponent
          }
        ]
      },
      {
        path: 'competitions',
        canActivate: [AuthGuardService],
        data: { auth: 'COMPETITION_MANAGE' },
        children: [
          {
            path: '',
            component: ManageCompetitionsComponent
          },
          {
            path: 'create',
            component: CompetitionCreateComponent
          },
          {
            path: 'edit',
            component: CompetitionEditComponent
          }
        ]
      },
      {
        path: 'tournaments',
        canActivate: [AuthGuardService],
        data: { auth: 'TOURNAMENT_MANAGE' },
        children: [
          {
            path: '',
            component: ManageTournamentsComponent
          },
          {
            path: 'create',
            component: TournamentCreateComponent
          },
          {
            path: 'edit',
            component: TournamentEditComponent
          }
        ]
      },
      {
        path: 'teams',
        canActivate: [AuthGuardService],
        data: { auth: 'TEAM_MANAGE' },
        children: [
          {
            path: '',
            component: ManageTeamsComponent
          },
          {
            path: 'create',
            component: TeamCreateComponent
          },
          {
            path: 'edit',
            component: TeamEditComponent
          }
        ]
      },
    ]
  },

  // { path: 'admin/teams', component: ManageTeamsComponent},
  // { path: 'admin/teams/create', component: TeamCreateComponent},
  // { path: 'admin/teams/edit', component: TeamEditComponent},

  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!', text: 'This page does not exist! Keep searching...'} },
  { path: 'not-authorized', component: ErrorPageComponent, data: {message: 'Not allowed!', text: 'You are not allowed to view this page!'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
