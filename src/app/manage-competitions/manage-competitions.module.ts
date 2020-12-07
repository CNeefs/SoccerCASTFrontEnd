import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCompetitionsComponent } from './manage-competitions.component';
import { CompetitionCreateComponent } from './competition-create/competition-create.component';
import { CompetitionEditComponent } from './competition-edit/competition-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CompetitionService } from '../services/competition.service';

@NgModule({
  declarations: [ManageCompetitionsComponent, CompetitionCreateComponent, CompetitionEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [CompetitionService],
  exports: [
    ManageCompetitionsComponent
  ]
})
export class ManageCompetitionsModule { }
