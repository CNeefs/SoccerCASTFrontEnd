import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTeamsComponent } from './view-teams.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ViewTeamsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ViewTeamsModule { }
