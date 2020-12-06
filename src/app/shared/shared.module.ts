import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
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
    LoadingSpinnerComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
