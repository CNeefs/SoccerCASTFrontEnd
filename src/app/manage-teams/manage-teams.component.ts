import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from '../models/team.model';
import { UserTeam } from '../models/user-team.model';
import { TeamService } from '../services/team.service';
import { UserTeamService } from '../services/user-team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss', '../styles/table_style.scss']
})
export class ManageTeamsComponent implements OnInit, OnDestroy {

  teams: Observable<Team[]>;
  teamsLenght: number = 0;
  sortedTeams: Team[];
  userTeams: UserTeam[];
  currentTeam: Team;

  getUserTeamsSub: Subscription;
  deleteUserTeamSub: Subscription;
  deleteTeamSub: Subscription;
  getTeamsSub: Subscription;

  pageLoaded: boolean = false;

  constructor(private router: Router, private _modalService: NgbModal, private _teamService: TeamService, private _userTeamService: UserTeamService) { }

  goToDetails(team: Team) {
    this.router.navigate(['user/teams/detail'], { queryParams: { id: team.teamID }});
  }

  goToCreate() {
    this.router.navigate(['admin/teams/create']);
  }

  goToEdit(team: Team) {
    this.router.navigate(['admin/teams/edit'], { queryParams: { id: team.teamID }});
  }

  openDeleteTeam(team: Team, contentDeleteModel) {
    this.currentTeam = team;
    this._modalService.open(contentDeleteModel)
  }

  deleteTeam(team: Team) {
    this.getUserTeamsSub = this._userTeamService.getUserTeams().subscribe((userTeams: UserTeam[]) => {
      this.userTeams = userTeams;
      for(let userTeam of this.userTeams) {
        if (userTeam.teamID == team.teamID) {
          this.deleteUserTeamSub = this._userTeamService.deleteUserTeamById(userTeam.userTeamID).subscribe();
        }
      }
      this.deleteTeamSub = this._teamService.deleteTeamById(team.teamID).subscribe(res => {
        this.ngOnInit()
      });
      this._modalService.dismissAll();
    })
  }

  ngOnInit(): void {
    this.teams = this._teamService.getTeams();
    this.teams.subscribe(teams => {
      this.sortedTeams = teams;
      this.teamsLenght = teams.length;
    })
    this.getTeamsSub = this.teams.subscribe(result => this.pageLoaded = true)
  }
  
  ngOnDestroy() {
    this.getTeamsSub.unsubscribe();
    
    if (this.getUserTeamsSub) {
      this.getUserTeamsSub.unsubscribe();
    }

    if (this.deleteTeamSub) {
      this.deleteTeamSub.unsubscribe();
    }

    if(this.deleteUserTeamSub) {
      this.deleteUserTeamSub.unsubscribe();
    }
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
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

}
