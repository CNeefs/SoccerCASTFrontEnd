import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTablesComponent } from './manage-tables.component';
import { TableCreateComponent } from './table-create/table-create.component';
import { TableEditComponent } from './table-edit/table-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { TableService } from '../services/table.service';

@NgModule({
  declarations: [ManageTablesComponent, TableCreateComponent, TableEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [TableService],
  exports: [
    ManageTablesComponent
  ]
})
export class ManageTablesModule { }
