import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/models/team.model';
import { UserTeam } from 'src/app/models/user-team.model';
import { User } from 'src/app/models/user.model';
import { TeamService } from 'src/app/services/team.service';
import { UserTeamService } from 'src/app/services/user-team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  selectedTeamID: number = 0;
  selectedTeam: Team = null;

  currentUser: User;

  pageLoaded: boolean = false;

  userTeams: UserTeam[] = [];
  teamIds: Number[] = [];

  constructor(private _userTeamService: UserTeamService, private _teamService: TeamService, private _authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._authService.user.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
        this._userTeamService.userTeams(user.userID).subscribe(res => res.map(userTeam => {
          this.userTeams.push(userTeam);
          this.teamIds.push(userTeam.teamID);
        }));
        console.log(this.teamIds);
        this.route.queryParams.subscribe(params => {
          this.selectedTeamID = params['id'];
        });
        this._teamService.getTeamById(this.selectedTeamID).subscribe(team => {
          this.selectedTeam = team;
          this.pageLoaded = true;
        })
      }
    });
  }
}
