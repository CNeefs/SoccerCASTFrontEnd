import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManageUsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, 
    SharedModule
  ], exports: [
    ManageUsersComponent,
  ]
})
export class ManageUsersModule { }
