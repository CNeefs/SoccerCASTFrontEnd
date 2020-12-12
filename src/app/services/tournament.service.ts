import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tournament } from '../models/tournament.model';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient) { }

    getTournaments() {
        return this.http.get<Tournament[]>(this.baseUrl + "tournament/");
    }

    getTournamentById(tournamentID: number) {
        return this.http.get<Tournament>(this.baseUrl + 'tournament/' + tournamentID);
    }

    deleteCTournamentById(tournamentID: number) {
        return this.http.delete<Tournament>(this.baseUrl + 'tournament/' + tournamentID);
    }

    addTournament(tournament: Tournament) {
        return this.http.post<Tournament>(this.baseUrl + "tournament/", tournament, { reportProgress: true, observe: 'events' });
    }

    editTournament(id: number, tournament: Tournament) {
        return this.http.put<Tournament>(this.baseUrl + "tournament/" + id, tournament);
    }

    startTournament(tournament: Tournament) {
        return this.http.post<Tournament>(this.baseUrl + "tournament/start/", tournament, { reportProgress: true, observe: 'events' });
    }
}