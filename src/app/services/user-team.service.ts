import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserTeam } from '../models/user-team.model';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';

@Injectable({
    providedIn: 'root'
})
export class UserTeamService {

    baseUrl: string = "https://localhost:44388/api/";

    constructor(private http: HttpClient) {}

    getUserTeams() {
        return this.http.get<UserTeam[]>(this.baseUrl + "userteam/");
    }

    getUserTeamsByUserId(userID: number) {
        return this.http.get<Team[]>(this.baseUrl + 'userteam/userteams/' + userID);
    }

    userTeams(userID: number) {
        return this.http.get<UserTeam[]>(this.baseUrl + 'userteam/' + userID);
    }

    getUsersTeamByTeamId(teamID: number) {
        return this.http.get<User[]>(this.baseUrl + 'userteam/teamusers/' + teamID + "/" + 1);
    }

    getUsersTeamInReview(teamID: number) {
        return this.http.get<User[]>(this.baseUrl + 'userteam/teamusers/' + teamID + "/" + 2);
    }

    deleteUserTeamById(userTeamID: number) {
        return this.http.delete<UserTeam>(this.baseUrl + 'userteam/' + userTeamID);
    }

    declineUser(userID: number, teamID: number) {
        return this.http.delete<UserTeam>(this.baseUrl + 'userteam/decline/user/' + userID + '/team/' + teamID);
    }

    approveUser(userTeam: UserTeam) {
        return this.http.post<UserTeam>(this.baseUrl + 'userteam/approve/', userTeam, { reportProgress: true, observe: 'events' });
    }

    editUserTeam(id: number, userTeam: UserTeam) {
      return this.http.put<UserTeam>(this.baseUrl + "userteam/" + id, userTeam);
    }
}