import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-view-tournaments',
  templateUrl: './view-tournaments.component.html',
  styleUrls: ['./view-tournaments.component.scss', '../styles/table_style.scss']
})
export class ViewTournamentsComponent implements OnInit {

  tournaments: Observable<Tournament[]>;

  pageLoaded: boolean = false;

  constructor(private _tournamentService: TournamentService, private router: Router) { }

  goToDetail(tournament: Tournament) {
    this.router.navigate(['user/tournaments/detail'], { queryParams: { id: tournament.tournamentID }});
  }

  ngOnInit(): void {
    this.tournaments = this._tournamentService.getTournaments();
    this.tournaments.subscribe(result => this.pageLoaded = true);
  }
}
