import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';

import { DirectivesModule } from '../directives/directives.module';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    RouterModule,
    SharedModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
