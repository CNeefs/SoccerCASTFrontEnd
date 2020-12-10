import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationhomeComponent } from './documentationhome/documentationhome.component';

import { DirectivesModule } from '../directives/directives.module';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DocumentationhomeComponent],
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
