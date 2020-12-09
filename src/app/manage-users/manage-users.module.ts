import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { NgxBootstrapMultiselectDropdownModule } from 'ngx-bootstrap-multiselect-dropdown';

@NgModule({
  declarations: [
    ManageUsersComponent,
    UserCreateComponent,
    UserEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, 
    SharedModule,
    NgxBootstrapMultiselectDropdownModule
  ], exports: [
    ManageUsersComponent,
  ]
})
export class ManageUsersModule { }
