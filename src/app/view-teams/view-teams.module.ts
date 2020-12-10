import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTeamsComponent } from './view-teams.component';
import { SharedModule } from '../shared/shared.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';


@NgModule({
  declarations: [ViewTeamsComponent, TeamDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ViewTeamsModule { }
