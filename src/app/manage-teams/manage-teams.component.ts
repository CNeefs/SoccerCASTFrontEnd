import { Component, OnDestroy, OnInit } from '@angular/core';
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
      this.deleteTeamSub = this._teamService.deleteTeamById(team.teamID).subscribe();
      this.teams = this.teams.pipe(
        map(res => res.filter(t => t.teamID != team.teamID))
      );
      this._modalService.dismissAll();
    })
  }

  ngOnInit(): void {
    this.teams = this._teamService.getTeams();
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

}
