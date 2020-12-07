import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTeamsComponent } from './manage-teams.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManageTeamsComponent
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
