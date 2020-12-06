import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    ShortenPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatIconModule
  ],
  exports: [
    NgbModule,
    MatIconModule,
    ShortenPipe
  ]
})
export class SharedModule { }
