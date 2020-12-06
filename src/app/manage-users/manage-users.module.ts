import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ManageUsersListComponent } from './manage-users-list/manage-users-list.component';
import { ManageUsersDetailComponent } from './manage-users-detail/manage-users-detail.component';



@NgModule({
  declarations: [
    ManageUsersComponent,
    ManageUsersListComponent,
    ManageUsersDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, 
    SharedModule
  ], exports: [
    ManageUsersComponent,
    ManageUsersListComponent
  ]
})
export class ManageUsersModule { }
