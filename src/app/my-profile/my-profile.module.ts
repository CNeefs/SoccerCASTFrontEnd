import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyProfileEditComponent } from './my-profile-edit/my-profile-edit.component';


@NgModule({
  declarations: [MyProfileComponent, MyProfileEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ], 
  exports: [MyProfileComponent, MyProfileEditComponent]
})
export class MyProfileModule { }
