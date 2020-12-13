import { Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from '../services/table.service';
import { Table } from '../models/table.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss', '../styles/table_style.scss']
})
export class ManageTablesComponent implements OnInit {

  tables: Observable<Table[]>;
  sortedTables: Table[] = [];
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
      this._modalService.dismissAll();
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.tables = this._tableService.getTables();
    this.tables.subscribe(tables => {
      this.sortedTables = [];
      tables.map(table => {
        if (table.tableStatusID != 2) this.sortedTables.push(table);
      })
      this.tablesLength = this.sortedTables.length;
    });
    this.tables.subscribe(result => this.pageLoaded = true)
  }

  //sorting
  sortData(sort: Sort) {
    const data = this.sortedTables.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTables = data;
      return;
    }

    this.sortedTables = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'tableName': return compare(a.tableName, b.tableName, isAsc);
        case 'companyName': return compare(a.companyName, b.companyName, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'contactUser': return compare(a.contactUser.lastName, b.contactUser.lastName, isAsc);
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
