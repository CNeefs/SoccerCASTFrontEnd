import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTeamsComponent } from './view-teams.component';
import { SharedModule } from '../shared/shared.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ViewTeamEditComponent } from './view-team-edit/view-team-edit.component';
import { ViewTeamCreateComponent } from './view-team-create/view-team-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewTeamsComponent, TeamDetailComponent, ViewTeamEditComponent, ViewTeamCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ViewTeamsModule { }
