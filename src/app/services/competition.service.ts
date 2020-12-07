import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Competition } from '../models/competition.model';

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient) { }

    getCompetitions() {
        return this.http.get<Competition[]>(this.baseUrl + "competition/");
    }

    getCompetitionById(competitionID: number) {
        return this.http.get<Competition>(this.baseUrl + 'competition/' + competitionID);
    }

    deleteCompetitionById(competitionID: number) {
        return this.http.delete<Competition>(this.baseUrl + 'competition/' + competitionID);
    }

    addCompetition(competition: Competition) {
        return this.http.post<Competition>(this.baseUrl + "competition/", competition, { reportProgress: true, observe: 'events' });
    }

    editCompetition(id: number, competition: Competition) {
        return this.http.put<Competition>(this.baseUrl + "competition/" + id, competition);
    }

    setCompetitionActive(id: number, competition: Competition) {
        return this.http.put<Competition>(this.baseUrl + 'competition/active/' + id, competition);
    }
}