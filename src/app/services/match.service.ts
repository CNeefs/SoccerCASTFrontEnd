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

    getMatchesByTournamentId(id: Number) {
        return this.http.get<Match[]>(this.baseUrl + "match/tournament/" + id);
    }

    addMatch(match: Match) {
        return this.http.post<Match>(this.baseUrl + "match/", match);
    }

    acceptMatch(id: Number, match: Match) {
        match.matchStatusID = 6;
        return this.http.put<Match>(this.baseUrl + "match/" + id, match);
    }

    startMatch(id: Number, match: Match) {
        match.matchStatusID = 5;
        return this.http.put<Match>(this.baseUrl + "match/" + id, match);
    }

    cancelMatch(id: Number, match: Match) {
        match.matchStatusID = 3;
        return this.http.put<Match>(this.baseUrl + "match/" + id, match);
    }

    deleteMatch(id: Number) {
        return this.http.delete<Match>(this.baseUrl + "match/" + id);
    }
}