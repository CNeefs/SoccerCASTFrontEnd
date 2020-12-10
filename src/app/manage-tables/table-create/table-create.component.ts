import { Component, OnInit } from '@angular/core';
import { Table } from '../../models/table.model';
import { User } from '../../models/user.model';
import { TableService } from '../../services/table.service';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.scss', '../../styles/validation_style.scss']
})
export class TableCreateComponent implements OnInit {

  createForm: FormGroup;
  users: Observable<User[]>;

  constructor(private _tableService: TableService, private _userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    var table = new Table(0, this.createForm.controls['tableName'].value, this.createForm.controls['companyName'].value,
      this.createForm.controls['location'].value, Number(this.createForm.controls['contactUserID'].value), null);
    this._tableService.addTable(table).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/tables']);
      }
    });
  }

  ngOnInit(): void {
    this.users = this._userService.getUsers();
    this.createForm = this.fb.group({
      tableName: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      contactUserID: ['', Validators.required]
    });
  }
}
