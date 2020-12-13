import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Table } from '../models/table.model';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    baseUrl: string = "https://soccercastbackend.azurewebsites.net/api/";

    constructor(private http: HttpClient) { }

    getTables() {
        return this.http.get<Table[]>(this.baseUrl + "table/");
    }

    getTableById(tableID: number) {
        return this.http.get<Table>(this.baseUrl + 'table/' + tableID);
    }

    deleteTableById(tableID: number) {
        return this.http.delete<Table>(this.baseUrl + 'table/' + tableID);
    }

    addTable(table: Table) {
        return this.http.post<Table>(this.baseUrl + "table/", table, { reportProgress: true, observe: 'events' });
    }

    editTable(id: number, table: Table) {
      return this.http.put<Table>(this.baseUrl + "table/" + id, table);
    }
}