import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [AuthComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [AuthGuardService],
  exports: [AuthComponent, SignupComponent]
})
export class AuthModule { }
