import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTeamsComponent } from './manage-teams.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamEditComponent } from './team-edit/team-edit.component';



@NgModule({
  declarations: [
    ManageTeamsComponent,
    TeamCreateComponent,
    TeamEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ManageTeamsComponent
  ]
})
export class ManageTeamsModule { }
