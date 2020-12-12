import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { Table } from '../models/table.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss', '../styles/table_style.scss']
})
export class ManageTablesComponent implements OnInit {

  tables: Observable<Table[]>;
  tablesLength: number = 0;
  currentTable: Table;

  pageLoaded: boolean = false;

  constructor(private _tableService: TableService, private router: Router, private _modalService: NgbModal) { }
  
  goToCreate() {
    this.router.navigate(['admin/tables/create']);
  }

  goToEdit(table: Table) {
    this.router.navigate(['admin/tables/edit'], { queryParams: { id: table.tableID }});
  }

  openDeleteTable(table: Table, contentDeleteModel) {
    this.currentTable = table;
    this._modalService.open(contentDeleteModel)
  }

  deleteTable(table: Table) {
    this._tableService.deleteTableById(table.tableID).subscribe(res => {
      this.ngOnInit();
    });
    this._modalService.dismissAll();
  }

  ngOnInit(): void {
    this.tables = this._tableService.getTables();
    this.tables.subscribe(tables => {
      this.tablesLength = tables.length;
    });
    this.tables.subscribe(result => this.pageLoaded = true)
  }
}
