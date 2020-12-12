import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { TableService } from '../services/table.service';
import { Table } from '../models/table.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export type SortColumn = keyof Table | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

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
      this.ngOnInit();
    });
    this._modalService.dismissAll();
  }

  sortTables(attributeSort: string) {
    console.log('sort');
    this.sortedTables.sort(function(a, b) {
      if(a[attributeSort] < b[attributeSort]) return 1;
      if(a[attributeSort] > b[attributeSort]) return -1;
      return 0;
    })
  }

  ngOnInit(): void {
    this.tables = this._tableService.getTables();
    this.tables.subscribe(tables => {
      this.sortedTables = tables;
      this.tablesLength = tables.length;
    });
    this.tables.subscribe(result => this.pageLoaded = true)
  }

  //sorting 
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {
    console.log(this.sortedTables);
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.sortedTables;
    } else {
      this.sortedTables = [...this.sortedTables].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
