import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { ViewTournamentsComponent } from './view-tournaments.component';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TournamentDetailComponent, ViewTournamentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ViewTournamentsModule { }
