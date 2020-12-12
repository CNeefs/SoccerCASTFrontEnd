import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationhomeComponent } from './documentationhome/documentationhome.component';

import { DirectivesModule } from '../directives/directives.module';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { UserDocumentationComponent } from './user-documentation/user-documentation.component';
import { TeamDocumentationComponent } from './team-documentation/team-documentation.component';
import { TableDocumentationComponent } from './table-documentation/table-documentation.component';
import { MatchesDocumentationComponent } from './matches-documentation/matches-documentation.component';
import { CompetitionsDocumentationComponent } from './competitions-documentation/competitions-documentation.component';
import { TournamentsDocumentationComponent } from './tournaments-documentation/tournaments-documentation.component';
import { RankingsDocumentationComponent } from './rankings-documentation/rankings-documentation.component';
import { GeneralDocumentationComponent } from './general-documentation/general-documentation.component';



@NgModule({
  declarations: [DocumentationhomeComponent, UserDocumentationComponent, TeamDocumentationComponent, TableDocumentationComponent, MatchesDocumentationComponent, CompetitionsDocumentationComponent, TournamentsDocumentationComponent, RankingsDocumentationComponent, GeneralDocumentationComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    DocumentationhomeComponent
  ]
})
export class DocumentationModule { }
