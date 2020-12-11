import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ], 
  exports: [MyProfileComponent]
})
export class MyProfileModule { }
