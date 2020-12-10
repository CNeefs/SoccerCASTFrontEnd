import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Match } from '../models/match.model';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient) { }

    getMatchesByTeamId(id: Number) {
        return this.http.get<Match[]>(this.baseUrl + "match/team/" + id);
    }

    getMatchesByUserId(id: Number) {
        return this.http.get<Match[]>(this.baseUrl + "match/user/" + id);
    }
}