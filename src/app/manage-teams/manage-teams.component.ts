import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss', '../styles/table_style.scss']
})
export class ManageTeamsComponent implements OnInit {

  teams: Observable<Team[]>;
  currentTeam: Team;

  pageLoaded: boolean = false;

  constructor(
    private router: Router,
    private _modalService: NgbModal,
    private _teamService: TeamService
  ) { }

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
    this._teamService.deleteTeamById(team.teamID).subscribe();
    this.teams = this.teams.pipe(
      map(res => res.filter(t => t.teamID != team.teamID))
    );
    this._modalService.dismissAll();
  }

  ngOnInit(): void {
    this.teams = this._teamService.getTeams();
    this.teams.subscribe(result => this.pageLoaded = true)
  }

}
