import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TeamStatus } from '../models/team-status.model';

@Injectable({
    providedIn: 'root'
})
export class TeamStatusService {

    baseUrl: string = "https://soccercastbackend.azurewebsites.net/api/";

    constructor(private http: HttpClient) {}

    getTeamStatuses() {
        return this.http.get<TeamStatus[]>(this.baseUrl + "TeamStatus");
    }
}