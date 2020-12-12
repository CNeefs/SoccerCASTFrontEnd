import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TournamentTeam } from '../models/tournament-team.models';

@Injectable({
    providedIn: 'root'
})
export class TournamentTeamService {

    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient) {}

    getTournamentTeams(id: number) {
        return this.http.get<TournamentTeam[]>(this.baseUrl + "tournamentteam/" + id);
    }

    addTournamentTeam(tournamentTeam: TournamentTeam) {
        return this.http.post<TournamentTeam>(this.baseUrl + "tournamentteam/", tournamentTeam);
    }
}