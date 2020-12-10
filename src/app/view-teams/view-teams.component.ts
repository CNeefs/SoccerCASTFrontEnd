import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.scss', '../styles/table_style.scss']
})
export class ViewTeamsComponent implements OnInit {

  teams: Observable<Team[]>;
  currentTeam: Team;
  currentUser: User;

  pageLoaded: boolean = false;

  constructor(private _authService: AuthService, private _teamService: TeamService, private router: Router) { }

  goToCreate() {
    this.router.navigate(['user/teams/create']);
  }

  goToDetails(team: Team) {
    this.router.navigate(['user/teams/detail'], { queryParams: { id: team.teamID }});
  }

  joinTeam(team: Team) {
    this._teamService.joinTeam(this.currentUser.userID, team).subscribe();
  }

  askJoinTeam(team: Team) {
    this._teamService.joinReviewTeam(this.currentUser.userID, team).subscribe();
  }

  ngOnInit(): void {
    this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
    });
    this.teams = this._teamService.getTeams();
    this.teams.subscribe(result => this.pageLoaded = true);
  }
}
