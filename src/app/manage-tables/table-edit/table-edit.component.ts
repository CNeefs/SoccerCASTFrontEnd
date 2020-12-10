import { Component, OnInit } from '@angular/core';
import { Table } from '../../models/table.model';
import { User } from '../../models/user.model';
import { TableService } from '../../services/table.service';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss', '../../styles/validation_style.scss']
})
export class TableEditComponent implements OnInit {

  editForm: FormGroup;
  selectedTableID: number = 0;
  selectedTable: Table = null;
  users: Observable<User[]>;

  constructor(private _tableService: TableService, private _userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    this.selectedTable.tableName = this.editForm.controls['tableName'].value;
    this.selectedTable.companyName = this.editForm.controls['companyName'].value;
    this.selectedTable.location = this.editForm.controls['location'].value;
    this.selectedTable.contactUserID = Number(this.editForm.controls['contactUserID'].value);
    this._tableService.editTable(this.selectedTableID, this.selectedTable).subscribe();
    this.router.navigate(['admin/tables']);
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTableID = params['id'];
    });

    this.users = this._userService.getUsers();

    this._tableService.getTableById(this.selectedTableID).subscribe(res => {
      this.selectedTable = res;
      this.editForm = this.fb.group({
        tableName: [res.tableName, Validators.required],
        companyName: [res.companyName],
        location: [res.location, Validators.required],
        contactUserID: [res.contactUserID, Validators.required]
      });
    }, error => {
      this.router.navigate(['admin/tables']);
    });
  }
}
