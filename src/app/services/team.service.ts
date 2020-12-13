import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../models/team.model';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    baseUrl: string = "https://soccercastbackend.azurewebsites.net/api/";

    constructor(private http: HttpClient) {}

    upload(formData: FormData, id:number) {
        return this.http.post<{path:string}>(
          this.baseUrl + 'Team/'+ id+ '/upload', formData
        );
      }

    getTeams() {
        return this.http.get<Team[]>(this.baseUrl + "team/");
    }

    getTeamById(teamID: number) {
        return this.http.get<Team>(this.baseUrl + 'team/' + teamID);
    }

    deleteTeamById(teamID: number) {
        return this.http.delete<Team>(this.baseUrl + 'team/' + teamID);
    }

    addTeam(team: Team) {
        return this.http.post<Team>(this.baseUrl + "team/", team, { reportProgress: true, observe: 'events' });
    }

    editTeam(id: number, team: Team) {
      return this.http.put<Team>(this.baseUrl + "team/" + id, team);
    }

    joinTeam(id: number, team: Team) {
        return this.http.post<Team>(this.baseUrl + "team/join/" + id, team);
    }

    joinReviewTeam(id: number, team: Team) {
        return this.http.post<Team>(this.baseUrl + "team/join/review/" + id, team);
    }
}