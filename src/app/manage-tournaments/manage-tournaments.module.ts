import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTournamentsComponent } from './manage-tournaments.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { TournamentEditComponent } from './tournament-edit/tournament-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { TournamentService } from '../services/tournament.service';

@NgModule({
  declarations: [ManageTournamentsComponent, TournamentCreateComponent, TournamentEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [TournamentService],
  exports: [
    ManageTournamentsComponent
  ]
})
export class ManageTournamentsModule { }
