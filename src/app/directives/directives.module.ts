import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideIfUnauthorizedDirective } from './hide-if-unauthorized.directive';

import { AuthorizationService } from '../services/authorization.service';

@NgModule({
  declarations: [HideIfUnauthorizedDirective],
  imports: [
    CommonModule
  ],
  providers: [AuthorizationService],
  exports: [HideIfUnauthorizedDirective]
})
export class DirectivesModule { }
