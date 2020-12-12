import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ShortenPipe } from './shorten.pipe';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatIconModule,
    MatSortModule
  ],
  exports: [
    NgbModule,
    MatIconModule,
    LoadingSpinnerComponent,
    ShortenPipe,
    MatSortModule
  ]
})
export class SharedModule { }
