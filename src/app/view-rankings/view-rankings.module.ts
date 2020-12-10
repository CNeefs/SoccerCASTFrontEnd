import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewRankingsComponent } from './view-rankings.component';

@NgModule({
  declarations: [ViewRankingsComponent],
  imports: [
    CommonModule,
    SharedModule
  ], 
  exports: [ViewRankingsComponent]
})
export class ViewRankingsModule { }
