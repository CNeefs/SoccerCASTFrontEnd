import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [AuthComponent, SignupComponent]
})
export class AuthModule { }
