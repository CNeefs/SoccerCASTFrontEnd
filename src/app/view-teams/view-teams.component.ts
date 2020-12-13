import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
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
  sortedTeams: Team[];
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

  ngOnInit(): void {
    this._authService.user.subscribe((user: User) => {
      this.currentUser = user;
    });
    this.teams = this._teamService.getTeams();
    this.teams.subscribe(result => {
      this.sortedTeams = [];
      result.map(team => {
        if (team.teamStatusID != 4) this.sortedTeams.push(team);
      })
      this.pageLoaded = true
    });
  }

  //sorting
  sortData(sort: Sort) {
    const data = this.sortedTeams.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTeams = data;
      return;
    }

    this.sortedTeams = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'teamName': return compare(a.teamName, b.teamName, isAsc);
        case 'companyName': return compare(a.companyName, b.companyName, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'captain': return compare(a.captain.lastName, b.captain.lastName, isAsc);
        case 'teamStatus': return compare(a.teamStatus.statusName, b.teamStatus.statusName, isAsc);
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
