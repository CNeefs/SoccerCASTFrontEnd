import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AuthComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [AuthComponent, SignupComponent]
})
export class AuthModule { }
