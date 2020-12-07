import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.scss', '../styles/table_style.scss']
})
export class ManageTournamentsComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  currentTournament: Tournament;

  pageLoaded: boolean = false;

  constructor(private _tournamentService: TournamentService, private router: Router, private _modalService: NgbModal) { }

  goToCreate() {
    this.router.navigate(['admin/tournaments/create']);
  }

  goToEdit(tournament: Tournament) {
    this.router.navigate(['admin/tournaments/edit'], { queryParams: { id: tournament.tournamentID }});
  }

  openDeleteTournament(tournament: Tournament, contentDeleteModel) {
    this.currentTournament = tournament;
    this._modalService.open(contentDeleteModel)
  }

  deleteTournament(tournament: Tournament) {
    this._tournamentService.deleteCTournamentById(tournament.tournamentID).subscribe();
    this.tournaments = this.tournaments.pipe(
      map(res => res.filter(t => t.tournamentID != tournament.tournamentID))
    );
    this._modalService.dismissAll();
  }

  ngOnInit(): void {
    this.tournaments = this._tournamentService.getTournaments();
    this.tournaments.subscribe(result => this.pageLoaded = true)
  }
}
