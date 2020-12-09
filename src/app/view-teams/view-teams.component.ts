import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.scss', '../styles/table_style.scss']
})
export class ViewTeamsComponent implements OnInit {

  teams: Observable<Team[]>;
  currentTeam: Team;
  
  getTeamsSub: Subscription;

  pageLoaded: boolean = false;

  constructor(
    private router: Router,
    private _teamService: TeamService,
  ) { }

  goToCreate() {
    this.router.navigate(['admin/teams/create']);
  }

  ngOnInit(): void {
    this.teams = this._teamService.getTeams();
    this.getTeamsSub = this.teams.subscribe(result => this.pageLoaded = true)
  }
  
  ngOnDestroy() {
    this.getTeamsSub.unsubscribe();
  }

}
